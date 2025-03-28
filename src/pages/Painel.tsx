import { Center, Container, Heading } from "@chakra-ui/react";

import { useAuth } from "../components/Auth";

export default function Painel() {
  const auth = useAuth();
  return (
    <Container>
      <Center>
        <Heading size="5xl" paddingTop="4em">Painel</Heading>
        <p>{auth.session?.access_token}</p>
      </Center>
    </Container>
  )
}