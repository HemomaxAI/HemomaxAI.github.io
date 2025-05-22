import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Flex flexDirection={"column"}>
      <Flex 
        flexDirection={"row"} 
        height={"100px"} 
        backgroundColor={"#F6D3CFEB"} 
        padding={"16px 24px"} 
        fontFamily={"Patua One"} 
        userSelect={"none"}
        color={"#1D1D1D"} 
        fontSize={"20px"}
        fontWeight={"400"}
        justifyContent={"space-between"}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Flex 
          flexDirection={"row"} 
          alignItems={"center"} 
          gap={"8px"}
          cursor={"pointer"}
          onClick={() => navigate("/#")}
        >
          <img src="/hemomax-logo.png" alt="Hemomax" width={"50"} draggable={false} />
          <Text fontSize={"2xl"}>Hemomax</Text>
        </Flex>
        <Flex flexDirection={"row"} alignItems={"center"} gap={"32px"} justifyContent={"space-around"}>
          <Text borderBottom={"3px solid #000000"} color={"#000000"} cursor={"pointer"}>Início</Text>
          <Text color={"#484848"} cursor={"pointer"}>Para que serve?</Text>
          <Text color={"#484848"} cursor={"pointer"}>Como utilizar?</Text>
          <Text color={"#484848"} cursor={"pointer"}>Contate-nos</Text>
        </Flex>
        <Flex flexDirection={"row"} alignItems={"center"}>
          <Box 
            padding={"4px 8px"} 
            border={"2px solid #7E7E7E"} 
            borderRadius={"18px"} 
            backgroundColor={"#F6D3CF"} 
            color={"#484848"} 
            cursor={"pointer"}
            onClick={() => navigate("/entrar")}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F6D3CF22"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#F6D3CF"} 
            boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
          >
            Fazer login
          </Box>
        </Flex>
      </Flex>
      <Flex flexDirection={"column"} background={"linear-gradient(to bottom, #D64157, #2B0006)"} height={"3000px"}>
        <Box
          height={"96px"}
          width={"100%"}
        />
        <Flex flexDirection={"row"} paddingX={"96px"} gap={"16px"}>
          <Box width={"50%"} backgroundColor={"blue"}>
            a
          </Box>
          <Box 
            width={"50%"} 
            backgroundColor={"yellow"} 
            overflow={"hidden"} 
            borderRadius={"16px"}
            boxShadow={"2px 4px 10px rgba(0, 0, 0, 0.5)"}
          >
            <img src="/exame-de-sangue.jpg" alt="Exame de sangue" width={"100%"} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
