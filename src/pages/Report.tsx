import { Box, Flex } from "@chakra-ui/react";

export default function Report() {
  return (
    <Flex height={"100%"} direction={"column"} bg={"#D64157"}>
      <Box flexGrow={1}></Box>
      <Box >
        <Box padding={"16px"}>
          <input type="file" width={"50px"} />
        </Box>
      </Box>
    </Flex>
  )
}