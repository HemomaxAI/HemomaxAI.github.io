import { Button, Center, Container, Heading } from "@chakra-ui/react";

import { Link } from "react-router";

export default function Home() {
  return (
    <Container>
      <Center>
        <Heading size="5xl" paddingTop="4em">Website em desenvolvimento</Heading>
        <Link to={'/registrar'}>
          <Button>Registrar</Button>
        </Link>
      </Center>
    </Container>
  )
}
