import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Root({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <Flex direction="column" height={"100vh"}>
      <Navbar setShowSidebar={setShowSidebar} />
        <Flex direction="row" grow={1} flexGrow={1}>
          {showSidebar ? <Sidebar /> : null}
          <Box flexGrow={1}>
            {children}
          </Box>
        </Flex>
    </Flex>
  )
}