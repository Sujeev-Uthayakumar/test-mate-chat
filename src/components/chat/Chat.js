import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"; // Base Chat UI Kit styles
import "./styles.css"; // Your custom dark mode styles
import {
  MainContainer,
  ChatContainer,
  MessageInput,
  ExpansionPanel,
  Conversation,
  ConversationList,
  Search,
  Avatar,
  Sidebar,
  ConversationHeader,
  InfoButton,
} from "@chatscope/chat-ui-kit-react";

function Chat() {
  return (
    <div className="chat-wrapper">
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false} className="sidebar">
          <Search
            placeholder="Search..."
            className="search-bar custom-placeholder"
          />
          <ConversationList className="conversation-list">
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
              className="conversation"
            >
              <Avatar name="Lilly" />
            </Conversation>
            {/* Add more conversations as needed */}
          </ConversationList>
        </Sidebar>

        <ChatContainer className="chat-container">
          <ConversationHeader className="conversation-header">
            <ConversationHeader.Back />
            <Avatar name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageInput
            placeholder="Type message here"
            className="message-input"
          />
        </ChatContainer>

        <Sidebar position="right" className="sidebar">
          <ExpansionPanel title="HELP" className="expansion-panel">
            <p>Lorem ipsum</p>
            {/* Add more content as needed */}
          </ExpansionPanel>
          <ExpansionPanel title="OPTIONS" className="expansion-panel">
            <p>Lorem ipsum</p>
            {/* Add more content as needed */}
          </ExpansionPanel>
        </Sidebar>
      </MainContainer>
    </div>
  );
}

export default Chat;
