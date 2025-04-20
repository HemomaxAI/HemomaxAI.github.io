import { Center, Container, Heading } from "@chakra-ui/react";

import Root from "../components/Root";

export default function Painel() {
  return (
    <Root>
      <Container>
        <Center>
          <Heading size="5xl" paddingTop="4em">Painel</Heading>
        </Center>
      </Container>
    </Root>
  )
}