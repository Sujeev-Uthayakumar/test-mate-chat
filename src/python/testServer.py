from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000/*"}})

import os
import subprocess
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import DirectoryLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.indexes.vectorstore import VectorStoreIndexWrapper
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import CharacterTextSplitter
from pprint import pprint

import json
from pathlib import Path
from typing import Callable, Dict, List, Optional, Union

from langchain.docstore.document import Document
from langchain.document_loaders.base import BaseLoader

os.environ["OPENAI_API_KEY"] = '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'

class JSONLoader(BaseLoader):
    def __init__(
        self,
        file_path: Union[str, Path],
        content_key: Optional[str] = None,
        ):
        self.file_path = Path(file_path).resolve()
        self._content_key = content_key
    
    def create_documents(self, processed_data):
        documents = []
        for item in processed_data:
            content = ''.join(item)
            document = Document(page_content=content, metadata={})
            documents.append(document)
        return documents
    
    def process_item(self, item, prefix=""):
        if isinstance(item, dict):
            result = []
            for key, value in item.items():
                new_prefix = f"{prefix}.{key}" if prefix else key
                result.extend(self.process_item(value, new_prefix))
            return result
        elif isinstance(item, list):
            result = []
            for value in item:
                result.extend(self.process_item(value, prefix))
            return result
        else:
            return [f"{prefix}: {item}"]

    def process_json(self,data):
        if isinstance(data, list):
            processed_data = []
            for item in data:
                processed_data.extend(self.process_item(item))
            return processed_data
        elif isinstance(data, dict):
            return self.process_item(data)
        else:
            return []

    def load(self) -> List[Document]:
        """Load and return documents from the JSON file."""

        docs=[]
        with open(self.file_path, mode="r", encoding="utf-8") as json_file:
            try:
                data = json.load(json_file)
                processed_json = self.process_json(data)
                docs = self.create_documents(processed_json)
            except json.JSONDecodeError:
                print("Error: Invalid JSON format in the file.")
        return docs
         

PERSIST = True
chat_history = []

persistDirectory = 'openpersist'


@app.route('/api/run_script', methods=['POST'])
def run_python_script():
    data = request.json
    app.logger.info("Received data: %s", data)
    user_input = data['user_input']    

    if 'user_input' in data and isinstance(data['user_input'], str):
        user_input = data['user_input']
        
        if PERSIST and os.path.exists(persistDirectory):
            print("Reusing index...\n")
            vectorstore = Chroma(persist_directory=persistDirectory, embedding_function=OpenAIEmbeddings())
            index = VectorStoreIndexWrapper(vectorstore=vectorstore)
        else:
            loader = JSONLoader(file_path="./openliberty/commit_data.json")
            data = loader.load()
            
            loader2 = JSONLoader(file_path="./openliberty/files.json")
            data = loader2.load()
            if PERSIST:
                index = VectorstoreIndexCreator(vectorstore_kwargs={"persist_directory":persistDirectory}).from_loaders([loader, loader2])
            else:
                index = VectorstoreIndexCreator().from_loaders([loader, loader2])

        chain = ConversationalRetrievalChain.from_llm(
            llm=ChatOpenAI(model="gpt-4-1106-preview"),
            retriever=index.vectorstore.as_retriever(search_kwargs={"k": 600}),
        )

        result = chain({"question": user_input, "chat_history": chat_history})
        ret = {"output": result['answer']}
        # print(result)
        response = jsonify(ret)
        # print("\n")
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        
        chat_history.append((user_input, result['answer']))
        
        # print((user_input, result['answer']))
        print(chat_history)
        post = {"user_input": user_input, "result": result['answer']}

        return response
    
    else:
        return jsonify({"error": "Invalid input data"}), 400

@app.route('/api/get_repo_name', methods=['POST'])
def get_repo_name_from_git_file():
    git_file_path = '../../open-liberty/.git'
    if os.path.exists(git_file_path) and os.path.isdir(git_file_path):
        with open(os.path.join(git_file_path, 'config'), 'r') as f:
            for line in f:
                if line.strip().startswith('url ='):
                    url = line.strip().split('=')[1].strip()
                    repo_name = url.split('/')[-1].replace('.git', '')
                    return repo_name
    return None

@app.route('/api/get_recent_commits', methods=['POST'])
def get_repo_recent_commits(num_commits=5):
    repo_path = '../../open-liberty'
    try:
        # Run git log command to get recent commits
        result = subprocess.run(['git', 'log', '--pretty=format:%h - %an, %ar : %s', '-n', str(num_commits)], 
                                cwd=repo_path, 
                                stdout=subprocess.PIPE, 
                                stderr=subprocess.PIPE,
                                text=True)
        if result.returncode == 0:
            # Split the output by newlines to get individual commits
            commits = result.stdout.strip().split('\n')
            return commits
        else:
            print("Error:", result.stderr)
    except Exception as e:
        print("Exception occurred:", e)
    return []

if __name__ == '__main__':
    app.run(debug=True, port=5000)    