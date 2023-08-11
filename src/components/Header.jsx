import { Button, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import logo from "../assets/logo.svg";
import { useStore } from "../store";
import { HiLogout, HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const token = useStore((state) => state.token);

  const resetAuth = useStore((state) => state.resetAuth);

  const navigate = useNavigate();

  return (
    <Flex
      w="100%"
      py={6}
      px={22}
      boxShadow="lg"
      borderRadius="8px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image src={logo} alt="healjour" />
      {token ? (
        <Button
          leftIcon={<HiOutlineLogout size="24px" color="red.500" />}
          color="red.500"
          bg="none"
          _hover={{ bg: "none" }}
          onClick={() => {
            resetAuth();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </Flex>
  );
};

export default Header;
