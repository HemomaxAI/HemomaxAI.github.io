import { Box, Button, Center, Container, Heading, Input, VStack } from "@chakra-ui/react";

import { supabase } from "../supabaseClient";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      console.log(values);
      const response = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      console.log(response)

      navigate('/laudos');
    }
  });

  return (
    <Container>
      <Center>
        <Box>
          <VStack>
            <form onSubmit={formik.handleSubmit}>
              <Heading size="5xl" paddingTop="4em" >Entrar</Heading>
              <Input placeholder="E-mail" type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
              <Input placeholder="Senha" type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
              <Button type="submit">Entrar</Button>
            </form>
          </VStack>
        </Box>
      </Center>
    </Container>
  )
}