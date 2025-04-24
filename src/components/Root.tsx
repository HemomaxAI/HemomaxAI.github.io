import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Root({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <Box>
      <Navbar setShowSidebar={setShowSidebar} />
      <Box>
        { showSidebar ? <Sidebar /> : null }
        { children }
      </Box>
    </Box>
  )
}