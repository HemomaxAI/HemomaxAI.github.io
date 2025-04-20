import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Navbar />
      <Box>
        <Sidebar />
        { children }
      </Box>
    </Box>
  )
}