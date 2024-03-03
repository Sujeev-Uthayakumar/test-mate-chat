import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Divider,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiExternalLink,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiMoon,
  FiPlus,
  FiSun,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Sidebar = ({ isResponsive, ...props }) => {
  const [isOpen, setIsOpen] = useState(true),
    handleOpen = () => setIsOpen(true),
    handleClose = () => setIsOpen(false);

  let chat = [
    { id: 1, role: "Admin" },
    { id: 2, role: "User" },
    { id: 3, role: "Tester" },
  ];

  let selectedChat = chat[0];

  const [listRef] = useAutoAnimate();

  let { toggleColorMode, colorMode } = useColorMode();

  let responsiveProps = isResponsive
    ? {
        position: "fixed",
        left: isOpen ? 0 : "-100%",
        top: 0,
      }
    : {};

  return (
    <>
      {!!isResponsive && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <IconButton
            aria-label="menu"
            icon={<FiMenu />}
            onClick={handleOpen}
          />
          <Heading size="md">Role</Heading>
          <IconButton
            aria-label="add"
            icon={<FiPlus />}
            onClick={() => console.log("add")}
          />
        </Stack>
      )}
      {!!isOpen && (
        <Stack
          as={motion.div}
          width="full"
          height="full"
          position="absolute"
          top={0}
          left={0}
          transition="all ease .5s"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        />
      )}
      <Stack
        maxWidth="350px"
        width="full"
        height="full"
        padding={2}
        color="white"
        backgroundColor="#171717"
        zIndex={1}
        transition="all ease .5s"
        {...responsiveProps}
      >
        {!!isResponsive && (
          <IconButton
            aria-label="close button"
            icon={<FiX />}
            position="absolute"
            right={0}
            transform={"translateX(125%)"}
            colorScheme="red"
            backgroundColor="gray.800"
            color="white"
            onClick={handleClose}
          />
        )}
        <Button
          leftIcon={<FiPlus size={16} />}
          borderWidth={1}
          borderColor="whiteAlpha.400"
          rounded={4}
          padding={2}
          justifyContent="flex-start"
          transition="all ease .5s"
          backgroundColor="transparent"
          onClick={() => console.log("add")}
          _hover={{
            backgroundColor: "whiteAlpha.100",
          }}
        >
          New chat
        </Button>
        <Stack height="full" overflowY="auto" ref={listRef}>
          {chat.map(({ id, role }) => {
            return (
              <Button
                id={id}
                key={id}
                cursor="pointer"
                borderRadius={15}
                leftIcon={() => {
                  return (
                    <div
                      style={{
                        borderRadius: "50%",
                      }}
                    >
                      <FiMessageSquare />
                    </div>
                  );
                }}
                justifyContent="flex-start"
                padding={6}
                maxHeight="64px"
                height="full"
                marginBottom="3px"
                overflow="hidden"
                textOverflow="ellipsis"
                backgroundColor={
                  selectedChat?.id === id ? "#ffffff20" : "transparent"
                }
                onClick={() => console.log("select")}
                _hover={{
                  backgroundColor: "whiteAlpha.100",
                }}
                style={{
                  border: "1px solid #FFFFFF5C",
                }}
              >
                <Text>{role}</Text>
                <Spacer />
                <FiTrash2
                  className="icon"
                  onClick={() => console.log("delete")}
                  style={{
                    display: selectedChat?.id === id ? "block" : "none",
                  }}
                />
              </Button>
            );
          })}
        </Stack>
        <Divider marginY={2} borderColor="white" />
        <Stack>
          <Button
            leftIcon={<FiTrash2 />}
            justifyContent="flex-start"
            padding={2}
            backgroundColor="transparent"
            _hover={{
              backgroundColor: "blackAlpha.300",
            }}
          >
            Clear conversations
          </Button>
          <Button
            justifyContent="flex-start"
            padding={2}
            onClick={toggleColorMode}
            backgroundColor="transparent"
            leftIcon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
            _hover={{
              backgroundColor: "blackAlpha.300",
            }}
          >
            {(colorMode = "dark" ? "Light mode" : "Dark mode")}
          </Button>
          <Button
            leftIcon={<FiExternalLink />}
            justifyContent="flex-start"
            padding={2}
            backgroundColor="transparent"
            _hover={{
              backgroundColor: "blackAlpha.300",
            }}
          >
            Updates & FAQ
          </Button>
          <Button
            leftIcon={<FiLogOut />}
            justifyContent="flex-start"
            padding={2}
            backgroundColor="transparent"
            _hover={{
              backgroundColor: "blackAlpha.300",
            }}
          >
            Log Out
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Sidebar;
