import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Flex } from "@aws-amplify/ui-react";
import { ThemeContext } from "./ThemeProvider";
import { LuMoon, LuSun } from "react-icons/lu";
import { signOut } from "aws-amplify/auth";
import { Logo } from "./Logo";
import { defineComponentTheme } from "@aws-amplify/ui-react/server";

export const navLinkTheme = defineComponentTheme({
  name: "nav-link",
  theme(tokens) {
    return {
      textDecoration: "none",
      cursor: "pointer",
      display: "flex",
      color: tokens.colors.font.primary,
      ":hover": {
        color: tokens.colors.font.interactive,
      },
      ":active": {
        color: tokens.colors.font.active,
      },
      _modifiers: {
        active: {
          backgroundColor: tokens.colors.background.info,
        },
      },
    };
  },
});

export const Sidebar = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  return (
    <Flex
      direction="column"
      width="20rem"
      padding="medium"
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
      <NavLink
        className={({ isActive }) =>
          navLinkTheme.className({ _modifiers: { active: isActive } })
        }
        to="/chat"
      >
        Chat
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          navLinkTheme.className({ _modifiers: { active: isActive } })
        }
        to="/recipe-generator"
      >
        Recipe generator
      </NavLink>
      <Link to="story-generator" state={{ story: "cats", title: "aristocats" }}>
        Test
      </Link>
    </Flex>
  );
};
