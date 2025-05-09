/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
  Input,
} from '@chakra-ui/react';
import { supabase } from "../supabaseClient";
import { useAuth } from '../components/Auth';
// Interface com apenas o campo necessário
interface Biomedical {
  user_id: string;
  name: string;

}

const BiomedicalPage: React.FC = () => {
  const auth = useAuth();
  
  // const [biomedicals, setBiomedicals] = useState<Biomedical[]>([]);
  const [selectedBiomedical, setSelectedBiomedical] = useState<Biomedical | null>(null);
  const [showEditor, setShowEditor] = useState(false);

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
  
  // Mock usando user_id
  // const insertMockEmployees = async () => {
  //   const user_id = auth.session?.user.id;
  //   if (!user_id) {
  //     console.error('Usuário não autenticado');
  //     return;
  //   }
  //   const biomedicalMock: Omit<Biomedical, 'user_id'>[] = [
  //     { name: 'Luciane Almeida' },
  //     { name: 'Pedro Álvares' },
  //     { name: 'Laura Diniz Freitas' },
  //     { name: 'Kleber Machado' },
  //   ];
  //   const { data, error } = await supabase
  //     .from('employees')
  //     .insert({
  //       "institution_id": "8b19081a-786c-4106-9899-c703df939f5e",
  //       "name": "Luciane Almeida",
  //     });
  //   if (error) {
  //     console.error('Erro ao inserir biomédicos:', error);
  //   } else {
  //     console.log('Biomédicos inseridos com sucesso:', data);
  //     fetchEmployees(); 
  //   }
  // };

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

  async function createEmployee(name: string, email: string, password: string) {
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

  const fetchEmployees = async () => {
    const user_id = auth.session?.user.id;
    if (!user_id) return;

    const { data, error } = await supabase
      .from('employees')
      .select('user_id, name')
      .eq('user_id', user_id);

    if (error) {
      console.error('Erro ao buscar biomédicos:', error);
    } else {
      console.log('Biomédicos do Supabase:', data);
      setBiomedicals(data as Biomedical[]);
    }
  };

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

  // useEffect(() => {
  //   const user_id = auth.session?.user.id;
  //   if (user_id) {
  //     fetchEmployees();
  //   }
  // }, [user_id]);

  const handleEditClick = (biomedical: Biomedical) => {
    const user_id = auth.session?.user.id;
    setSelectedBiomedical(biomedical);
    setShowEditor(true);
  };

  const handleSave = async () => {
    const user_id = auth.session?.user.id;
    if (!selectedBiomedical || !user_id) return;

    const { error } = await supabase
      .from('employees')
      .update({ name: selectedBiomedical.name })
      .eq('user_id', user_id)
      .eq('name', selectedBiomedical.name); // ou use uma coluna id única real

    if (error) {
      console.error('Erro ao atualizar biomédico:', error);
    } else {
      fetchEmployees();
      setShowEditor(false);
    }
  };

  const bgColor = 'red.400';
  const lineBg = 'red.400';

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <Text fontSize="xl" fontWeight="bold" color="white" textAlign="center" mb={6}>
        Lista de Biomédicos participantes do plano
      </Text>

      <VStack spacing={4} align="stretch" maxW="600px" mx="auto">
        {biomedicals.map((biomedical, index) => (
          <Flex
            key={index}
            justify="space-between"
            align="center"
            bg={lineBg}
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
              onClick={() => handleEditClick(biomedical)}
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
                setSelectedBiomedical({ ...selectedBiomedical, name: e.target.value })
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
          onClick={async () => await createEmployee("Laura", "laura@email.com", "123456")}
          bg="blue.500"
          color="white"
          _hover={{ bg: 'blue.600' }}
        >
          Inserir Biomédicos
        </Button>
      </Flex>

      <Flex justify="center" mt={6}>
        <div>
        {/* {biomedicals.map((employee, index) => {
          return (
            <div key={index}>
              <li>{employee.name}</li>
            </div>
          )
        })
        } */}
        </div>
      </Flex>
    </Box>
  );
};

export default BiomedicalPage;
