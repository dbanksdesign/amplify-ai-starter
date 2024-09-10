import * as React from "react";
import { NavLink } from "react-router-dom";
import { Button, Flex } from "@aws-amplify/ui-react";
import { ThemeContext } from "./ThemeProvider";
import { LuMoon, LuSun } from "react-icons/lu";
import { signOut } from "aws-amplify/auth";
import { Logo } from "./Logo";

export const Sidebar = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  return (
    <Flex
      direction="column"
      width="30rem"
      padding="medium"
      alignItems={"flex-start"}
      backgroundColor="background.secondary"
    >
      <Flex direction="row" gap="small" color="font.primary">
        <Logo width="2rem" height="2rem" />
        <Button
          onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
        >
          {colorMode === "light" ? <LuMoon /> : <LuSun />}
        </Button>
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </Button>
      </Flex>
      <NavLink to="/chat">Chat</NavLink>
      <NavLink to="/recipe-generator">Recipe generator</NavLink>
    </Flex>
  );
};
