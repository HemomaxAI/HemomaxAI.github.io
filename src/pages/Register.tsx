import { Box, Button, Center, Container, Heading, Input, VStack } from "@chakra-ui/react";

import { supabase } from "../supabaseClient";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cnpj: "",
      name: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const response = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      console.log(response)

      navigate('/painel');
    }
  });

  return (
    <Container>
      <Center>
        <Box>
          <VStack>
            <form onSubmit={formik.handleSubmit}>
              <Heading size="5xl" paddingTop="4em" >Registrar</Heading>
              <Input placeholder="Nome" type="text" name="name" onChange={formik.handleChange} value={formik.values.name} />
              <Input placeholder="CNPJ" type="text" name="cnpj" onChange={formik.handleChange} value={formik.values.cnpj} />
              <Input placeholder="E-mail" type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
              <Input placeholder="Senha" type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
              <Button type="submit">Registrar</Button>
            </form>
          </VStack>
        </Box>
      </Center>
    </Container>
  )
}