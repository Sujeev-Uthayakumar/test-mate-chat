import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"; // Base Chat UI Kit styles
import "./styles.css"; // Your custom dark mode styles
import {
  MainContainer,
  ChatContainer,
  ExpansionPanel,
  Conversation,
  ConversationList,
  Search,
  Sidebar,
  ConversationHeader,
  InfoButton,
} from "@chatscope/chat-ui-kit-react";
import {
  FormControl,
  FormLabel,
  Input as DefaultInput,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ChakraProvider,
} from "@chakra-ui/react";

// Custom Input component
const Input = ({ errorMessage, label, helperText, inputLeftAddon, inputRightAddon, required, ...props }) => {
  return (
    <FormControl isInvalid={Boolean(errorMessage)} isRequired={required}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup alignItems="center">
        {inputLeftAddon && <InputLeftElement>{inputLeftAddon}</InputLeftElement>}
        <DefaultInput {...props} />
        {inputRightAddon && <InputRightElement>{inputRightAddon}</InputRightElement>}
      </InputGroup>
    </FormControl>
  );
};

function Chat() {
  return (
    <ChakraProvider> {/* Wrap your Chat component with ChakraProvider */}
      <div className="chat-wrapper">
        <MainContainer responsive>
          <Sidebar position="left" scrollable={false} className="sidebar">
            <Search
              placeholder="Search..."
              className="search-bar custom-placeholder"
            />
            <ConversationList className="conversation-list">
              <Conversation
                name="Lorem"
                lastSenderName="Lorem"
                info="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                className="conversation"
              >
                {/* <Avatar name="Lilly" /> */}
              </Conversation>
            </ConversationList>
          </Sidebar>

          <ChatContainer className="chat-container">
            <ConversationHeader className="conversation-header">
            <ConversationHeader.Back />
              {/* <Avatar name="Zoe" /> */}
              <ConversationHeader.Content
                userName="Lorem ipsum"
                info="Last asked 10 mins ago"
              />
              <ConversationHeader.Actions>
                <InfoButton />
              </ConversationHeader.Actions>
            </ConversationHeader>
            {/* Replace MessageInput with the custom Input component */}
            <Input placeholder="Type message here" className="message-input" />
          </ChatContainer>

          <Sidebar position="right" className="sidebar">
            <ExpansionPanel
              title="HELP"
              className="expansion-panel"
              style={{
                backgroundColor: "#d5e8f6",
              }}
            >
              <p>Documentation or User Manuals</p>
              {/* Add more content as needed */}
            </ExpansionPanel>
            <ExpansionPanel
              title="OPTIONS"
              className="expansion-panel"
              style={{
                backgroundColor: "#d5e8f6",
              }}
            >
              <p>Check for Updates</p>
              <p>Contact Customer Support</p>
              <p>Privacy Policy</p>
              <p>Release Notes</p>
              {/* Add more content as needed */}
            </ExpansionPanel>
          </Sidebar>
        </MainContainer>
      </div>
    </ChakraProvider>
  );
}

export default Chat;




