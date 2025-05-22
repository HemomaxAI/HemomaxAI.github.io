import { Box, Flex } from "@chakra-ui/react";

import { useNavigate } from "react-router";
import { useAuth } from "./auth/auth-utils";

export default function Sidebar() {
  const navigate = useNavigate();
  const auth = useAuth();

  const links = [
    {
      path: "/laudos",
      label: "Laudos"
    },
    {
      path: "/gerenciar-biomedicos",
      label: "Gerenciar biomédicos"
    }
  ];

  return (
    <Box 
    width="250px" 
    height="100%" 
    bg="red.700" 
    boxSizing={"border-box"} 
    >
      <Flex direction="column" padding="16px" gap="16px">
        <Box> 
          { links.map((link, index) => {
            return <SidebarButton
              key={index} 
              onClick={() => navigate(link.path)} 
              text={link.label}
            />;
          }) }
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
      textOverflow={"ellipsis"}
      overflow={"hidden"}
      whiteSpace={"nowrap"}
      userSelect={"none"}
    >
      {text}
    </Box>
  )
}