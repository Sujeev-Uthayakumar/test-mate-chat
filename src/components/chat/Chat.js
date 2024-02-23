import { Avatar, IconButton, Spinner, Stack, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FiSend } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";

import Instructions from "../Layout/Instructions";
import Input from "../Input/Input";
import gptAvatar from "../../assets/gpt-avatar.svg";
import user from "../../assets/user.png";
import warning from "../../assets/warning.svg";

const Chat = () => {
  const overflowRef = useRef(null);
  const [parentRef] = useAutoAnimate();

  const { register, setValue, handleSubmit } = useForm();

  const hasSelectedChat = {
    id: 1,
    role: "Admin",
  };

  const selectedChat = {
    id: 1,
    role: "Admin",
    content: [
      {
        emitter: "gpt",
        message:
          "Hello! I'm ChatGPT, a conversational AI. How can I help you today?",
      },
      {
        emitter: "user",
        message: "I need help with my homework.",
      },
      {
        emitter: "gpt",
        message: "Sure! What do you need help with?",
      },
    ],
  };

  let isLoading = false;

  return (
    <Stack width="full" height="full">
      <Stack
        maxWidth="768px"
        width="full"
        marginX="auto"
        height="85%"
        overflow="auto"
        ref={overflowRef}
      >
        <Stack spacing={2} padding={2} ref={parentRef} height="full">
          {hasSelectedChat ? (
            selectedChat.content.map(({ emitter, message }, key) => {
              const getAvatar = () => {
                switch (emitter) {
                  case "gpt":
                    return gptAvatar;
                  case "error":
                    return warning;
                  default:
                    return user;
                }
              };

              const getMessage = () => {
                if (message.slice(0, 2) === "\n\n") {
                  return message.slice(2, Infinity);
                }

                return message;
              };

              return (
                <Stack
                  key={key}
                  direction="row"
                  padding={4}
                  rounded={8}
                  backgroundColor={
                    emitter === "gpt" ? "blackAlpha.200" : "transparent"
                  }
                  spacing={4}
                >
                  <Avatar name={emitter} src={getAvatar()} />
                  <Text
                    whiteSpace="pre-wrap"
                    marginTop=".75em !important"
                    overflow="hidden"
                  >
                    <ReactMarkdown>{getMessage()}</ReactMarkdown>
                  </Text>
                </Stack>
              );
            })
          ) : (
            <Instructions onClick={(text) => console.log("clicked")} />
          )}
        </Stack>
      </Stack>
      <Stack
        height="20%"
        padding={4}
        backgroundColor="blackAlpha.400"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        <Stack maxWidth="768px">
          <Input
            autoFocus={true}
            variant="filled"
            inputRightAddon={
              <IconButton
                aria-label="send_button"
                icon={!isLoading ? <FiSend /> : <Spinner />}
                backgroundColor="transparent"
                onClick={console.log("submit")}
              />
            }
            {...register("input")}
            onSubmit={console.log}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log(e.currentTarget.value);
              }
            }}
          />
          <Text textAlign="center" fontSize="sm" opacity={0.5}>
            Free Research Preview. Our goal is to make AI systems more natural
            and safe to interact with. Your feedback will help us improve.
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Chat;
