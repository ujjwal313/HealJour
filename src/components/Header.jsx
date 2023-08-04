import { Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import logo from "../assets/logo.svg";

const Header = () => {
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
      <Link href="/login">Login</Link>
    </Flex>
  );
};

export default Header;
