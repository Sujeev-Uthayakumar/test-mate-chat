import simpleGit from "simple-git";
import path from "path";
import fs from "fs";

const repoPath = '../sampleRepo/redux'; // Replace with your repository's path
const outputFile = './gitFinds/files.json'; // Change the file extension to '.json'

const codeFileExtensions = ['.js', '.py', '.cpp', '.java', '.c', '.cs', '.php']; // Add more code file extensions as needed

const fileTypeData = []; // Array to store fileType data in the desired format

// Use simple-git to get the list of files in the local Git repository
async function getFilesAndContent() {
  try {
    const result = await simpleGit(repoPath).silent(true).raw(['ls-files']);
    const filePaths = result.split('\n').filter(Boolean);

    await fileTypesAndNames(filePaths);
    await writeToFile(outputFile);
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

async function fileTypesAndNames(filePaths) {
  for (const filePath of filePaths) {
    const fileExtension = path.extname(filePath).toLowerCase();

    if (codeFileExtensions.includes(fileExtension)) {
      const fileTypeEntry = fileTypeData.find((entry) => entry.fileType === fileExtension);

      if (!fileTypeEntry) {
        fileTypeData.push({
          fileType: fileExtension,
          files: [],
        });
      }

      try {
        let content = await fs.promises.readFile(path.join(repoPath, filePath), 'utf8');
        
        // Replace Windows line endings (CRLF) with Unix line endings (LF)
        content = content.replace(/\r\n/g, '');

        // Replace backslashes with forward slashes
        content = content.replace(/\\/g, '/');

        // Remove all occurrences of escaped double quotes and escaped backslashes
        content = content.replace(/\\"/g, '').replace(/\\\\/g, '');
        
        const fileData = {
          fileName: filePath,
          content,
        };

        const fileTypeIndex = fileTypeData.findIndex((entry) => entry.fileType === fileExtension);
        fileTypeData[fileTypeIndex].files.push(fileData);
      } catch (err) {
        console.error(`Error reading file content for ${filePath}:`, err);
      }
    }
  }
}

async function writeToFile(outputFile) {
  try {
    const outputText = JSON.stringify(fileTypeData, null, 2);
    await fs.promises.writeFile(outputFile, outputText, 'utf-8');
    console.log(`Code file list has been saved to ${outputFile}`);
  } catch (err) {
    console.error('Error writing to file:', err);
  }
}

// Call the function to get files and their content and write to a JSON file.
getFilesAndContent();
