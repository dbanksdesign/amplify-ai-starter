import { Outlet } from "react-router-dom";
import { Flex } from "@aws-amplify/ui-react";
import { Sidebar } from "../components/Sidebar";

export default function Root() {
  return (
    <Flex
      direction="row"
      height="100vh"
      width="100vw"
      justifyContent="stretch"
      alignItems="stretch"
    >
      <Sidebar />
      <Outlet />
    </Flex>
  );
}
