import { Box, Button } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <Box width="250px" height="100vh" bg="gray.800" color="white" padding="16px">
      <Box fontSize="2xl" fontWeight="bold" marginBottom="16px">
        HemoMax IA
      </Box>
      <Box marginBottom="16px">
        <img src="/hemomax-logo.png" alt="Logo" width="100%" />
      </Box>
      <Box>
        {/* Add your sidebar links here */}
        <Button width="100%" marginBottom="8px">Dashboard</Button>
        <Button width="100%" marginBottom="8px">Settings</Button>
        <Button width="100%">Logout</Button>
      </Box>
    </Box>
  )
}