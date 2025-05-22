import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Toaster } from "sonner";

export default function Root({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <Flex
      direction="column"
      height={"100vh"}
      fontFamily={"Inter, sans-serif"}
      fontWeight={700}
    >
      <Toaster closeButton position="top-right" />
      <Navbar setShowSidebar={setShowSidebar}/>
      <Flex direction="row" grow={1} flexGrow={1} overflow={"hidden"}>
        {showSidebar ? <Sidebar /> : null}
        <Box flexGrow={1} overflowY={"auto"} >
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}