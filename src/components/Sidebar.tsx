import { Box, Flex } from "@chakra-ui/react";

import { useNavigate } from "react-router";
import { useAuth } from "./Auth";

export default function Sidebar() {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <Box width="250px" height="100%" bg="red.700" boxSizing={"border-box"} shadow={"0px 0px 5px #000000"}>
      <Flex direction="column" padding="16px" gap="16px">
        <Box> 
          <SidebarButton onClick={() => navigate("/hemomax/criar-laudo")} text="Criar laudo" />
          <SidebarButton onClick={() => navigate("/hemomax/gerenciar-biomedicos")} text="Gerenciar biomédicos" />
          <SidebarButton onClick={() => auth.logout()} text="Sair" />
        </Box>
      </Flex>
    </Box>
  )
}

function SidebarButton({ text, onClick }: { text: string, onClick: () => void }) {
  return (
    <Box
      height="40px"
      onClick={onClick}
      borderBottom={"1px solid #ffffff"}
      cursor={"pointer"}
      padding={"8px"}
      paddingLeft={"32px"}
    >
      {text}
    </Box>
  )
}