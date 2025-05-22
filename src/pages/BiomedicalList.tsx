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

// Interface com apenas o campo necessário
interface Biomedical {
  name: string;
  id: string;

}

const BiomedicalPage: React.FC = () => {
  const auth = useAuth();
  
  // const [biomedicals, setBiomedicals] = useState<Biomedical[]>([]);
  const [selectedBiomedical, setSelectedBiomedical] = useState<Biomedical | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [name, setName] = useState<string>("");

  const [biomedicals, setEmployees] = useState<{name: string}[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      const employees = await getAllEmployees();
      if (employees) {
        setEmployees(employees);
      }
    }

    fetchEmployees();
  }, [])

  async function getInstitutionId() {
    const { data, error } = await supabase
      .from('institutions')
      .select('id')
      .eq('user_id', auth.session?.user.id)
      .single();

    if (error) {
      alert("Error getting institution ID: " + error.message);
      return;
    }

    return data?.id;
  }

  async function createEmployee(name: string) {
    // const resp1 = await supabase.auth.signInWithPassword({
    //   email: email,
    //   password: password,
    // });

    // if (resp1.error) {
    //   alert("Error creating employee: " + resp1.error.message);
    //   return;
    // }

    const resp2 = await supabase
    .from('employees')
    .insert({
      "institution_id": await getInstitutionId(),
      "name": name,
      // "user_id": "2274927e-ef55-453a-bdaa-2542643c31e7"
    })
    .select();

    if (resp2.error) {
      alert("Error creating employee: " + resp2.error.message);
    }
        
    return resp2.data;
  }

  async function getAllEmployees() {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      // .eq('institution_id', await getInstitutionId());

    if (error) {
      alert("Error getting employees: " + error.message);
      return;
    }

    return data;
  }

  const handleEditClick = (biomedical: Biomedical) => {
    setSelectedBiomedical(biomedical);
    setShowEditor(true);
  };

  const handleSave = async () => {
    const user_id = auth.session?.user.id;
    if (!selectedBiomedical || !user_id) return;


    console.log("Selected biomedical:", selectedBiomedical);
    const { error } = await supabase
      .from('employees')
      .update({ name: selectedBiomedical.name })
      .eq('id', selectedBiomedical.id);

    if (error) {
      console.error('Erro ao atualizar biomédico:', error);
    } else {
      const employees = await getAllEmployees();
      if (employees) {
        setEmployees(employees);
      }
      setShowEditor(false);
    }
  };

  return (
    <Box p={6} height={"100%"} bg={"#D64157"}>
      <Text fontSize="xl" fontWeight="bold" color="white" textAlign="center" mb={6}>
        Lista de Biomédicos participantes do plano
      </Text>

      <VStack padding={"4px"} align="stretch" maxW="600px" mx="auto">
        {biomedicals.map((biomedical, index) => (
          <Flex
            key={index}
            justify="space-between"
            align="center"
            p={2}
            borderBottom="1px solid white"
          >
            <Text fontWeight="medium" color="white">
              {biomedical.name}
            </Text>
            <Button
              size="sm"
              bg="black"
              color="white"
              _hover={{ bg: 'gray.700' }}
              onClick={() => handleEditClick(biomedical as Biomedical)}
            >
              Editar
            </Button>
          </Flex>
        ))}

        {showEditor && selectedBiomedical && (
          <Box mt={4} p={4} bg="white" borderRadius="md" boxShadow="lg">
            <Text fontSize="lg" fontWeight="bold" mb={2} color="black">
              Editar Biomédico
            </Text>
            <Input
              placeholder="Nome"
              value={selectedBiomedical.name}
              onChange={(e) =>
              {
                console.log("Selected biomedical:", e.target.value)
                setSelectedBiomedical({ ...selectedBiomedical, name: e.target.value })
              }
              }
              mb={4}
              color="black"
            />
            <HStack justify="flex-end">
              <Button colorScheme="blue" onClick={handleSave}>
                Salvar
              </Button>
              <Button variant="ghost" onClick={() => setShowEditor(false)}>
                Cancelar
              </Button>
            </HStack>
          </Box>
        )}
      </VStack>

      <Flex justify="center" mt={6}>
        <Button
          colorScheme="blue"
          onClick={async () => {
            await createEmployee(name);
            const employees = await getAllEmployees();
            if (employees) {
              setEmployees(employees);
            }
          }}
          bg="blue.500"
          color="white"
          _hover={{ bg: 'blue.600' }}
        >
          Inserir Biomédicos
        </Button>
        <Input backgroundColor={"white"} color={"black"} type='text' onChange={(e) => setName(e.target.value)}></Input>
      </Flex>
    </Box>
  );
};

export default BiomedicalPage;
