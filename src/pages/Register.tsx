import { Box, Button, Center, Container, Heading, Input, VStack } from "@chakra-ui/react";

import { supabase } from "../supabaseClient";
import { useState } from "react";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    cnpj: "",
    name: "",
  });

  return (
    <Container>
      <Center>
        <Box>
          <VStack>
        <Heading size="5xl" paddingTop="4em" >Registrar</Heading>
            <Input placeholder="Nome" type="text" value={registerData.name} onChange={
              (e) => setRegisterData(data => {
                return { ...data, name: e.target.value }
              })
            } />
            <Input placeholder="Senha" type="text" value={registerData.password} onChange={
              (e) => setRegisterData(data => {
                return { ...data, password: e.target.value }
              })
            } />
            <Input placeholder="E-mail" type="text" value={registerData.email} onChange={
              (e) => setRegisterData(data => {
                return { ...data, email: e.target.value }
              })
            } />
            <Input placeholder="CNPJ" type="text" value={registerData.cnpj} onChange={
              (e) => setRegisterData(data => {
                return { ...data, cnpj: e.target.value }
              })
            } />
            <Button onClick={
              async () => {
                console.log(registerData);
                const response = await supabase.auth.signUp({
                  email: registerData.email,
                  password: registerData.password,
                });
                console.log(response)
              }
            }>Registrar</Button>
          </VStack>
        </Box>
      </Center>
    </Container>
  )
}