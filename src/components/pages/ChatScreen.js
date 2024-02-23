import { Stack, useMediaQuery } from "@chakra-ui/react";

import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";

const ChatScreen = () => {
  const [isResponsive] = useMediaQuery("(max-width: 800px)");

  return (
    <Stack
      direction={!isResponsive ? "row" : "column"}
      width="full"
      height="full"
      spacing={0}
    >
      <Sidebar isResponsive={isResponsive} />
      <Chat />
    </Stack>
  );
};

export default ChatScreen;
