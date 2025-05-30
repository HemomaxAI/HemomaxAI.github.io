import { Box, Text, Flex, Input } from "@chakra-ui/react";

import { supabase } from "../supabaseClient";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import HButton from "../components/HButton";

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
    <Flex fontFamily={"Patua One"} backgroundColor={"#BA2F44"} paddingY={"auto"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} height={"100dvh"}>
      <Modal width={"700px"}>
        <form onSubmit={formik.handleSubmit} >
          <Text fontSize={"4xl"} textAlign={"center"} color={"black"}>Registre-se</Text>
          <Flex flexDirection={"column"} gap={"16px"} alignItems={"center"}>
  
          <HInput label="E-mail" type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
          <HInput label="Senha" type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
          <HButton type="submit" marginX={"auto"} boxShadow={"0px 4px 5px rgba(0, 0, 0, 0.5)"}>Registrar</HButton>
          </Flex>
        </form>
      </Modal>
    </Flex>
  )
}


function Modal({...props}) {
  return (
    <Box padding={"32px 69px"} borderRadius={"16px"} boxShadow={"2px 4px 10px rgba(0, 0, 0, 0.5)"} backgroundColor={"#F3F3F3"} {...props}>
      {props.children}
    </Box>
  )
}

function HInput({ ...props }) {
  return (
    <Flex flexDirection={"column"} >
      <Text color={"black"} fontSize={"xl"}>{props.label}</Text>
      <Input {...props} 
      color={"black"} 
      borderColor={"black"} 
      fontSize={"2xl"}
      boxShadow={"1px 1px 10px rgba(0, 0, 0, 0.5)"} 
      borderWidth={"2px"}
      onBlur={e => e.currentTarget.style.borderColor = "black"} 
      onFocus={e => e.currentTarget.style.borderColor = "#D64157"}
      width={"400px"}
      height={"48px"}
      />
    </Flex>

  )
}