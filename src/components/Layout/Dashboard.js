import { Flex, Grid, Image, SimpleGrid, Spinner } from "@chakra-ui/react";
import { VscFileSubmodule } from "react-icons/vsc";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import LinkCard from "../LinkCard/LinkCard";
import StatCard from "../Card/StatCard";
import InfoCard from "../InfoCard/InfoCard";
import gptAvatar from "../../assets/gpt-avatar.svg";
import LargeListCard from "../LargeListCard/LargeListCard";
import SmallListCard from "../SmallListCard/SmallListCard";
import API_CONSTANTS from "../../utils/api";
import { set } from "react-hook-form";

const Dashboard = () => {
  const [numberOfFiles, setNumberOfFiles] = useState(null);
  const [numberOfCommits, setNumberOfCommits] = useState(null);
  const [numberOfCommiters, setNumberOfCommiters] = useState(null);
  const [numberOfTags, setNumberOfTags] = useState(null);
  const [recentCommits, setRecentCommits] = useState([]);
  const [topCommiters, setTopCommiters] = useState([]);
  const [readmeContent, setReadmeContent] = useState("");

  useEffect(() => {
    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.NUMBER_OF_FILES}`)
      .then((response) => {
        setNumberOfFiles(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.NUMBER_OF_COMMITS}`)
      .then((response) => {
        setNumberOfCommits(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.NUMBER_OF_COMMITERS}`)
      .then((response) => {
        setNumberOfCommiters(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.NUMBER_OF_TAGS}`)
      .then((response) => {
        setNumberOfTags(response.data);
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.RECENT_COMMITS}`)
      .then((response) => {
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.TOP_COMMITERS}`)
      .then((response) => {
        console.log("Repository data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });

    axios
      .post(`${API_CONSTANTS.API_URL}${API_CONSTANTS.README_CONTENT}`)
      .then((response) => {
        console.log("Repository data:", response.data);
        setReadmeContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });
  }, []);

  const timelineData = [
    {
      logo: gptAvatar,
      title: "$2400, Design changes",
      date: "22 DEC 7:20 PM",
      color: "teal.300",
    },
    {
      logo: gptAvatar,
      title: "New order #4219423",
      date: "21 DEC 11:21 PM",
      color: "orange",
    },
    {
      logo: gptAvatar,
      title: "Server Payments for April",
      date: "21 DEC 9:28 PM",
      color: "blue.400",
    },
    {
      logo: gptAvatar,
      title: "New card added for order #3210145",
      date: "20 DEC 3:52 PM",
      color: "orange.300",
    },
    {
      logo: gptAvatar,
      title: "Unlock packages for Development",
      date: "19 DEC 11:35 PM",
      color: "purple",
    },
    {
      logo: gptAvatar,
      title: "New order #9851258",
      date: "18 DEC 4:41 PM",
    },
  ];

  const dashboardTableData = [
    {
      logo: gptAvatar,
      name: "Purity UI Version",
      members: [gptAvatar],
      budget: "$14,000",
      progression: 60,
    },
    {
      logo: gptAvatar,
      name: "Add Progress Track",
      members: [gptAvatar],
      budget: "$3,000",
      progression: 10,
    },
    {
      logo: gptAvatar,
      name: "Fix Platform Errors",
      members: [gptAvatar],
      budget: "Not set",
      progression: 100,
    },
    {
      logo: gptAvatar,
      name: "Launch our Mobile App",
      members: [gptAvatar],
      budget: "$32,000",
      progression: 100,
    },
    {
      logo: gptAvatar,
      name: "Add the New Pricing Page",
      members: [gptAvatar],
      budget: "$400",
      progression: 25,
    },
    {
      logo: gptAvatar,
      name: "Redesign New Online Shop",
      members: [gptAvatar],
      budget: "$7,600",
      progression: 40,
    },
  ];
  return (
    <Flex
      marginLeft="25px"
      marginRight="25px"
      flexDirection="column"
      pt={{ base: "30px", md: "30px" }}
    >
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <StatCard
          title={"Number of Files"}
          amount={numberOfFiles || <Spinner />}
          icon={<VscFileSubmodule height={24} />}
        />
        <StatCard
          title={"Number of Commits"}
          amount={numberOfCommits || <Spinner />}
        />
        <StatCard
          title={"Number of Commiters"}
          amount={numberOfCommiters || <Spinner />}
        />
        <StatCard
          title={"Number of Tags"}
          amount={numberOfTags || <Spinner />}
        />
      </SimpleGrid>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my="26px"
        gap="24px"
      >
        <InfoCard
          title={"Built by Developers"}
          name={"Purity UI Dashboard"}
          description={
            <ReactMarkdown>{readmeContent}</ReactMarkdown> || <Spinner />
          }
          image={
            <Image
              src={gptAvatar}
              alt="chakra image"
              minWidth={{ md: "300px", lg: "auto" }}
            />
          }
        />
        <LinkCard
          backgroundImage={gptAvatar}
          title={"Built using OpenAI's GPT-4"}
          description={
            "An application integrating GPT-4 for intelligent bug detection and fixing advice within code repos."
          }
        />
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap="24px"
      >
        <LargeListCard
          title={"Recent Commits"}
          captions={["Date", "Commit Hash", "Commit Message"]}
          data={dashboardTableData}
        />
        <SmallListCard title={"Top Contributers"} data={timelineData} />
      </Grid>
    </Flex>
  );
};

export default Dashboard;
