import { Button, Center, Container, Heading, VStack } from "@chakra-ui/react";

import { Link } from "react-router";

export default function Home() {
  return (
    <Container>
      <Center>
        <VStack>
          <Heading size="5xl" paddingTop="4em">Home</Heading>
          <Link to={'/hemomax/registrar'}>
            <Button>Registrar</Button>
          </Link>
          <Link to={'/hemomax/entrar'}>
            <Button>Entrar</Button>
          </Link>
        </VStack>
      </Center>
    </Container>
  )
}
