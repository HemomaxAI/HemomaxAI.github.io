import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Flex flexDirection={"column"} fontFamily={"Patua One"} height={"100dvh"}>
      <Flex
        flexDirection={"row"}
        height={"100px"}
        backgroundColor={"#F6D3CFEB"}
        padding={"16px 24px"}
        userSelect={"none"}
        color={"#1D1D1D"}
        fontSize={"20px"}
        fontWeight={"400"}
        justifyContent={"space-between"}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Logo onClick={() => navigate("/#")} color="#1D1D1D"/>
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
      <Flex flexDirection={"column"} backgroundColor={"#D64157"} flexGrow={1}>
        <Box
          height={"96px"}
          width={"100%"}
        />
        <Flex flexDirection={"row"} paddingX={"96px"} gap={"16px"}>
          <Box width={"50%"}>
             <Logo justifyContent="center" marginY={"12px"}/>
             <Text fontSize={"xl"} marginY={"0px 12px"}>Identifique Doenças rapidamente e com mais Eficácia!</Text>
             <p>O HemoMax é treinado com mais de 50 mil imagens para identificar 30 tipos de doneças sanguíneas...</p>
             <Flex width={"100%"} marginY={"24px"} flexDirection={"column"} gap={"12px"}>
              <Text fontSize={"xs"}>Licenças a partir de R$ 29,90 / mês</Text>
              <Flex flexDirection={"row"} gap={"16px"} width={"100%"} >
                <Button padding={"16px"} borderRadius={"8px"} maxWidth={"100px"} flexGrow={1} onClick={() => navigate("/entrar")}>Conecte-se</Button>
                <Button padding={"16px"} borderRadius={"8px"} maxWidth={"100px"} flexGrow={1} onClick={() => navigate("/registrar")} backgroundColor={"#51BC1F"} color={"white"}>Assine já</Button>
              </Flex>
                <Text fontWeight={"600"} fontSize={"xs"} textDecoration={"underline"}>Faça um teste gratuito</Text>
             </Flex>
          </Box>
          <Box width={"50%"}>
            <Box            
              borderRadius={"16px"}
              boxShadow={"2px 4px 10px rgba(0, 0, 0, 0.5)"}
            >
              <img src="/exame-de-sangue.jpg" alt="Exame de sangue" width={"100%"} draggable={false} />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

function Logo({ ...props }) {
  return (
    <Flex
      flexDirection={"row"}
      alignItems={"center"}
      gap={"8px"}
      cursor={"pointer"}
      {...props}
    >
      <img src="/hemomax-logo.png" alt="Hemomax" width={"50"} draggable={false} />
      <Text fontSize={"2xl"} textShadow={"0px 2px 4px rgba(0, 0, 0, 0.5)"}>HemoMax IA</Text>
    </Flex>
  )
}