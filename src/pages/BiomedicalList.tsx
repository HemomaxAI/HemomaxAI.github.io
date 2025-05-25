import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient";
import { useAuth } from '../components/auth/auth-utils';

interface Biomedical {
  name: string;
  id: string;
}

const BiomedicalPage: React.FC = () => {
  const auth = useAuth();
  const [selectedBiomedical, setSelectedBiomedical] = useState<Biomedical | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [name, setName] = useState<string>("");
  const [biomedicals, setEmployees] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      const employees = await getAllEmployees();
      if (employees) {
        setEmployees(employees);
      }
    }
    fetchEmployees();
  }, []);

  async function getInstitutionId() {
    const { data, error } = await supabase
      .from('institutions')
      .select('id')
      .eq('user_id', auth.session?.user.id)
      .single();

    if (error) {
      alert("Erro ao buscar ID da instituição: " + error.message);
      return;
    }

    return data?.id;
  }

  async function createEmployee(name: string) {
    const resp = await supabase
      .from('employees')
      .insert({
        institution_id: await getInstitutionId(),
        name: name,
      })
      .select();

    if (resp.error) {
      alert("Erro ao criar biomédico: " + resp.error.message);
    }

    return resp.data;
  }

  async function getAllEmployees() {
    const { data, error } = await supabase
      .from('employees')
      .select('*');

    if (error) {
      alert("Erro ao buscar biomédicos: " + error.message);
      return;
    }

    return data;
  }

  const handleEditClick = (biomedical: Biomedical) => {
    setSelectedBiomedical(biomedical);
    setShowEditor(true);
  };

  const handleSave = async () => {
    if (!selectedBiomedical || !auth.session?.user.id) return;

    const { error } = await supabase
      .from('employees')
      .update({ name: selectedBiomedical.name })
      .eq('id', selectedBiomedical.id);

    if (error) {
      alert('Erro ao atualizar biomédico: ' + error.message);
    } else {
      const employees = await getAllEmployees();
      if (employees) {
        setEmployees(employees);
      }
      setShowEditor(false);
    }
  };

  return (
    <Box p={6} minHeight="100vh" bg="#D64157">
      <Text fontSize="2xl" fontWeight="bold" color="white" textAlign="center" mb={6}>
        Biomédicos participantes do plano
      </Text>

      <VStack gap={4} alignItems="stretch" maxW="600px" mx="auto">
        {biomedicals.map((biomedical) => (
          <Box
            key={biomedical.id}
            bg="whiteAlpha.200"
            borderRadius="md"
            p={4}
            boxShadow="md"
          >
            <Flex justify="space-between" align="center">
              <Text color="white" fontWeight="medium">
                {biomedical.name}
              </Text>
              <Button
                size="sm"
                bg="black"
                color="white"
                _hover={{ bg: "gray.700" }}
                onClick={() => handleEditClick(biomedical)}
              >
                Editar
              </Button>
            </Flex>
          </Box>
        ))}

        {showEditor && selectedBiomedical && (
          <Box mt={4} p={4} bg="white" borderRadius="md" boxShadow="lg">
            <Text fontSize="lg" fontWeight="bold" mb={2} color={"black"}>
              Editar Biomédico
            </Text>
            <Input
              placeholder="Nome"
              value={selectedBiomedical.name}
              onChange={(e) =>
                setSelectedBiomedical({ ...selectedBiomedical, name: e.target.value })
              }
              mb={4}
              color="gray.400"
            />
            <HStack justify="flex-end">
              <Button colorScheme="blue" onClick={handleSave} bg={"blue.500"} color="white" _hover={{ bg: "blue.600" }}>
                Salvar
              </Button>
              <Button variant="ghost" onClick={() => setShowEditor(false)}>
                Cancelar
              </Button>
            </HStack>
          </Box>
        )}
      </VStack>

      <Box mt={10} maxW="600px" mx="auto" p={4} bg="whiteAlpha.200" borderRadius="md">
        <Flex direction={{ base: "column", md: "row" }} gap={4} align="center">
          <Input
            placeholder="Nome do biomédico"
            value={name}
            onChange={(e) => setName(e.target.value)}
            bg="white"
            color="black"
            flex="1"
          />
          <Button
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            onClick={async () => {
              await createEmployee(name);
              const employees = await getAllEmployees();
              if (employees) {
                setEmployees(employees);
              }
              setName("");
            }}
          >
            Inserir Biomédico
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default BiomedicalPage;
