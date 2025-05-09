import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { supabase } from "../supabaseClient";

export default function ListReport() {

  const [reports, setReports] = useState<{
    id: string;
    created_by: string;
    input_text: string;
    input_image_id: string;
    created_at: Date;
  }[]>([]);



  useEffect(() => {
    async function fetchReports() {
      const { data, error } = await supabase
        .from("reports")
        .select("*")

      if (error) {
        alert("Error fetching reports: " + error.message);
        return;
      }

      setReports(data);
    }

    fetchReports();
  })

  return (
    <Flex height={"100%"} direction={"column"} bg={"#D64157"}>
      <Box>
        {reports.map((report) => (
          <Box key={report.id} p={4} bg={"white"} mb={4}>
            <Button onClick={() => console.log(report.id)}>{report.created_at.toISOString()}</Button>


          </Box>
        ))}
      </Box>
    </Flex>
  )
}