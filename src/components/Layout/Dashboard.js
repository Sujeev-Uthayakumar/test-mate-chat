import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import LinkCard from "../LinkCard/LinkCard";
import StatCard from "../Card/StatCard";
import InfoCard from "../InfoCard/InfoCard";
import gptAvatar from "../../assets/gpt-avatar.svg";
import LargeListCard from "../LargeListCard/LargeListCard";
import SmallListCard from "../SmallListCard/SmallListCard";
import { FiSend } from "react-icons/fi";

const Dashboard = () => {
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
      pt={{ base: "120px", md: "75px" }}
    >
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <StatCard
          title={"Today's Moneys"}
          amount={"$53,000"}
          percentage={55}
          icon={<FiSend height={24} />}
        />
        <StatCard title={"Today's Moneys"} amount={"$53,000"} percentage={55} />
        <StatCard title={"Today's Moneys"} amount={"$53,000"} percentage={55} />
        <StatCard title={"Today's Moneys"} amount={"$53,000"} percentage={55} />
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
            "From colors, cards, typography to complex elements, you will find the full documentation."
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
          title={"Work with the rockets"}
          description={
            "Wealth creation is a revolutionary recent positive-sum game. It is all about who takes the opportunity first."
          }
        />
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap="24px"
      >
        <LargeListCard
          title={"Projects"}
          amount={30}
          captions={["Companies", "Members", "Budget", "Completion"]}
          data={dashboardTableData}
        />
        <SmallListCard
          title={"Orders Overview"}
          amount={30}
          data={timelineData}
        />
      </Grid>
    </Flex>
  );
};

export default Dashboard;
