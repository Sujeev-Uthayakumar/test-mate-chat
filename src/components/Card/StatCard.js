import {
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Card,
  CardBody,
} from "@chakra-ui/react";

import IconBox from "../IconBox/IconBox";

const StatCard = ({ title, amount, percentage, icon }) => {
  return (
    <Card minH="83px">
      <CardBody>
        <Flex flexDirection="row" align="center" justify="center" w="100%">
          <Stat me="auto">
            <StatLabel
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              pb=".1rem"
            >
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize="lg">{amount}</StatNumber>
              <StatHelpText
                alignSelf="flex-end"
                justifySelf="flex-end"
                m="0px"
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight="bold"
                ps="3px"
                fontSize="md"
              >
                {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
              </StatHelpText>
            </Flex>
          </Stat>
          <IconBox as="box" h={"45px"} w={"45px"}>
            {icon}
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default StatCard;
