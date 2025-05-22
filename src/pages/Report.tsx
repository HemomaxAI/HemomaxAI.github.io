import { Box, Flex, Text } from "@chakra-ui/react";

import { supabase } from "../supabaseClient";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AuthContextType, useAuth } from "../components/auth/auth-utils";
import { toast } from "sonner";

import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import HButton from "../components/HButton";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

type Report = {
  created_by: string;
  created_at: string;
  input_image_id: string;
  input_image_path: string;
}

export default function Report() {
  const auth = useAuth();

  const [reports, setReports] = useState<Report[]>([]);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);

  return !currentReport ?
    <ListReports reports={reports} setReports={setReports} setCurrentReport={setCurrentReport} auth={auth} /> :
    <ViewReport currentReport={currentReport} setCurrentReport={setCurrentReport} />;
}

function ListReports({
  setReports,
  reports,
  auth,
  setCurrentReport
}: {
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
  auth: AuthContextType;
  reports: Report[];
  setCurrentReport: React.Dispatch<React.SetStateAction<Report | null>>;
}) {
  const [page, setPage] = useState(1);
  const [file, setFile] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageUploadClick() {
    fileInputRef.current?.click();
  };
  function updateImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
    }
  };
  async function uploadFile() {
    if (!file) {
      toast.error("Arquivo não selecionado");
      return;
    }

    const userId = auth.session?.user.id;

    if (!userId) {
      toast.error("Usuário não autenticado");
      return;
    }

    const path = `${userId}/${new Date().getTime()}`;

    const fileResponse = await supabase.storage
      .from('report-images')
      .upload(path, file);

    if (fileResponse.error) {
      toast.error("Erro ao tentar fazer upload do arquivo: " + fileResponse.error.message);
    } else if (fileResponse.data?.id) {
      // update the report with the file id
      const reportResponse = await supabase
        .from('reports')
        .insert({
          created_by: userId,
          input_image_id: fileResponse.data?.id,
          input_image_path: path
        })
        .select();

      if (reportResponse.error) {
        toast.error("Erro ao tentar criar laudo: " + reportResponse.error.message);
        return;
      }

      const reportId = reportResponse.data?.[0]?.id

      if (!reportId) {
        toast.error("Erro ao tentar criar laudo: ID do laudo não encontrado");
        return;
      }
    } else {
      toast.error("Erro ao tentar fazer upload do arquivo: ID do arquivo não encontrado");
    }

    toast.success("O relatório foi criado com sucesso!");
    setFile(undefined);
    getPaginatedReports();
  }
  async function getPaginatedReports() {
    const pageSize = 5;
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const response = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
      .range(start, end)
      .eq('created_by', auth.session?.user.id);

    if (response.error) toast.error("Erro ao tentar buscar laudos: " + response.error.message);
    else setReports(response.data);
  }

  useEffect(() => {
    async function getPaginatedReports() {
      const pageSize = 5;
      const start = (page - 1) * pageSize;
      const end = start + pageSize - 1;

      const response = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false })
        .range(start, end)
        .eq('created_by', auth.session?.user.id);

      if (response.error) toast.error("Erro ao tentar buscar laudos: " + response.error.message);
      else setReports(response.data);
    }
    getPaginatedReports();
  }, [auth.session?.user.id, page, setReports]);


  return <Flex direction={"column"} minHeight={"100%"} bg={"#D64157"}>
    <Flex direction={"row"} justifyContent={"space-evenly"} paddingTop={"16px"}>
      {
        page > 1 ?
          <IoIosArrowBack cursor={"pointer"} size={35} onClick={() => setPage(page => page - 1 || 1)} /> :
          <Box width={"35px"} />
      }
      <Text color={"white"} userSelect={"none"} fontSize={24}>{page}</Text>
      {
        reports.length < 5 ?
          <Box width={"35px"} /> :
          <IoIosArrowForward cursor={"pointer"} size={35} onClick={() => setPage(page => page + 1)} />
      }
    </Flex>
    <Box paddingX={"48px"} paddingY={"32px 0px"}>
      {reports.map((report, index) => {
        return (
          <Flex direction={"row"} justifyItems={"center"} justifyContent={"space-between"} key={index} padding={"16px"} borderBottom={"1px solid #ffffff"}>
            {getFormatedDate(report.created_at)}
            <HButton
              onClick={() => setCurrentReport(report)} backgroundColor={"#51BC1F"}>
              Acessar relatório
            </HButton>
          </Flex>
        )
      }
      )}
    </Box>
    <Box flexGrow={1} />
    <Box paddingBottom={"16px"} marginX={"auto"}>
      <Flex
        bgColor={'white'}
        borderRadius={"8px"}
        flexDirection={"row"}
        width={"600px"}
        height={"50px"}
        justifyContent={"space-between"}
        borderBlockColor={"black"}
        borderWidth={"1px"}
        padding={"2px 48px"}
        alignItems={"center"}
      >
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={updateImage} />
        <ImAttachment style={{ cursor: "pointer" }} onClick={() => handleImageUploadClick()} color="#779FE5" size={"40px"} />
        <Text color={"grey"} userSelect={"none"}>{file?.name || "Anexar imagem"}</Text>
        <IoSend style={{ cursor: "pointer" }} onClick={async () => await uploadFile()} color="#779FE5" size={"40px"} />
      </Flex>
    </Box>
  </Flex>
}


function ViewReport({
  currentReport,
  setCurrentReport
}: {
  currentReport: Report;
  setCurrentReport: React.Dispatch<React.SetStateAction<Report | null>>;
}) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    async function getImage() {
      const response = await supabase.storage
        .from('report-images')
        .createSignedUrl(currentReport.input_image_path, 60 * 60 * 12);

      if (response.error) {
        toast.error("Erro ao tentar buscar laudo: " + response.error.message);
        return;
      }

      const url = response.data?.signedUrl;

      if (!url) {
        toast.error("Erro ao tentar buscar laudo: URL do laudo não encontrada");
        return;
      }

      setImage(url);
    }

    getImage();
  }, [currentReport.created_by, currentReport.input_image_id, currentReport.input_image_path]);

  return (
    <Flex direction={"column"} bg={"#D64157"}>
      <Flex flexDirection={"row"} justifyContent={"space-between"} padding={"16px"}>
        <span>{getFormatedDate(currentReport.created_at)}</span>
        <span></span>
        <HButton onClick={() => setCurrentReport(null)}>Voltar</HButton>
      </Flex>
      <Flex flexGrow={1} justifyContent={"center"} alignItems={"center"}>
        <img
          src={image || ""}
          alt="Laudo"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      </Flex>
      <Flex marginTop={"16px"} border={"1px solid white"} backgroundColor={"white"} borderRadius={"8px"} marginX={"auto"} width={"600px"} paddingTop={"16px"}>
        <Text textAlign={"justify"} paddingX={"32px"} paddingBottom={"32px"} fontSize={20} color={"black"} fontFamily={"Inter, sans-serif"} fontWeight={400}>
          <p>O paciente apresenta anormalidade de número de celulas</p>
          <p>2 Celulas más/ mml</p>
          <p>Normalidade de 1.5</p>
          <p>Suspeita de Leucemia</p>
        </Text>
      </Flex>
    </Flex>
  );
}

function getFormatedDate(date: string) {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
}