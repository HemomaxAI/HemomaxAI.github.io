import { Box, Button, Flex, Textarea } from "@chakra-ui/react";

import { supabase } from "../supabaseClient";
import { useAuth } from "../components/Auth";
import { useState } from "react";

export default function Report() {
  const auth = useAuth();
  
  const [file, setFile] = useState<File | undefined>();
  const [text, setText] = useState<string | undefined>();

  async function uploadFile() {
    if (!file) {
      alert("No file selected");
      return;
    };
    
    const userId = auth.session?.user.id;
    
    if (!userId) {
      alert("User not authenticated");
      return;
    }
    
    const report = await supabase
    .from('reports')
    .insert({
      created_by: userId,
      input_text: text,
    })
    .select();

    if (report.error) {
      alert("Error creating report: " + report.error.message);
      return;
    }

    const reportId = report.data?.[0]?.id

    if (!reportId) {
      alert("Error creating report: No report ID returned");
      return;
    }
    const { data, error } = await supabase.storage
      .from('report-images')
      .upload(`${userId}/${reportId}.${file.name.split(".").pop()}`, file);

    if (error) {
      alert("Error uploading file: " + error.message);
    } else if (data?.id) {
      // update the report with the file id
      const response = await supabase
        .from('reports')
        .update({
          input_image_id: data?.id
        })
        .eq('id', reportId);

        if (response.error) {
          alert("Error updating report: " + response.error.message);
        }
    } else {
      alert("Error uploading file: No file ID returned");
    }
  }

  return (
    <Flex height={"100%"} direction={"column"} bg={"#D64157"}>
      <Box flexGrow={1}></Box>
      <Box padding={"16px"}>
      <Flex >
        <Box padding={"16px"}>
          <input type="file" width={"50px"} onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              setFile(file);
            } else {
              alert("No file selected");
            }
            
          }} />
        </Box>
          <Button onClick={async () => await uploadFile()}>Enviar</Button>
      </Flex>
      <Textarea backgroundColor={"white"} color={"black"} onChange={(event) => {
        const text = event.target.value;

        if (text) {
          setText(text);
        }
      }} value={text}>

      </Textarea>
      </Box>
    </Flex>
  )
}