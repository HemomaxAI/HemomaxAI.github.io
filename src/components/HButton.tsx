import { Button } from "@chakra-ui/react";

import { IoIosArrowForward } from "react-icons/io";

export default function HButton({ ...props }) {
  return (
    <Button
      fontFamily={"Inter, sans-serif"}
      fontWeight={700}
      fontSize={"2xl"}
      color={"white"}
      backgroundColor={"#51BC1F"}
      borderRadius={"35px"}
      height={"48px"}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#3A8E14";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#51BC1F";
      }}
      {...props}
    >
      {props.children}
      <IoIosArrowForward size={24} />
    </Button>
  )
}