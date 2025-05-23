import { Box, Flex } from "@chakra-ui/react";

import { FaBars } from "react-icons/fa6";

export default function Navbar({
  setShowSidebar
}: {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Flex 
      width="100%" 
      height="56px" 
      minHeight="56px" 
      bg="red.700" 
      alignItems={"center"} 
      justifyContent="space-between" 
      paddingX="16px" 
      borderBottom={"1px solid#ffffff"}
      boxShadow={"0px 0px 5px #000000"}
    >
      <Box width="32px" height="32px" onClick={() => setShowSidebar(value => !value)} cursor="pointer">
        <FaBars size={32}/>
      </Box>
      <Flex direction="row" gap="8px" userSelect={"none"}>
        <span style={{
          fontFamily: "Patua One",
          fontSize: "22px",
          textShadow: "0px 0px 5px #000000",
          textOverflow: "ellipsis",
          userSelect: "none",
          fontWeight: 400
        }}>HemoMax IA</span>
        <img src="hemomax-logo.png" width="32px" height="32px" draggable={false} style={{userSelect: "none"}}/>
      </Flex>
      <Box></Box>
    </Flex>
  )
}

