import { Stack, useMediaQuery, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";
import Dashboard from "../Layout/Dashboard";
import API_CONSTANTS from "../../utils/api";

const ChatScreen = () => {
  const [isResponsive] = useMediaQuery("(max-width: 800px)");
  const [repoName, setRepoName] = useState("");
  const [commitData, setCommitData] = useState([]);

  useEffect(() => {
    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.REPO_NAME}`)
      .then((response) => {
        setRepoName(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });
  }, []);

  return (
    <Stack
      direction={!isResponsive ? "row" : "column"}
      width="full"
      height="full"
      spacing={0}
    >
      {/* Sidebar configuration */}
      <Sidebar repoName={repoName} isResponsive={isResponsive} />

      {/* Main content area */}
      <Box flex="1" overflowY="auto" height="100vh">
        {/* <Chat/> */}
        <Dashboard />
      </Box>
    </Stack>
  );
};

export default ChatScreen;
