import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
  Input,
  Badge,
} from '@chakra-ui/react';

interface Biomedical {
  id: number;
  name: string;
  requestedUpdate?: boolean;
}

const biomedicalMock: Biomedical[] = [
  { id: 1, name: 'Luciane Almeida' },
  { id: 2, name: 'Pedro Álvares', requestedUpdate: true },
  { id: 3, name: 'Laura Diniz Freitas' },
  { id: 4, name: 'Kleber Machado' },
];

const BiomedicalPage: React.FC = () => {
  const [biomedicals, setBiomedicals] = useState<Biomedical[]>(biomedicalMock);
  const [selectedBiomedical, setSelectedBiomedical] = useState<Biomedical | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const bgColor = 'red.400';
  const lineBg = 'red.400';

  const handleEditClick = (biomedical: Biomedical) => {
    setSelectedBiomedical(biomedical);
    setShowEditor(true);
  };

  const handleSave = () => {
    if (selectedBiomedical) {
      setBiomedicals((prev) =>
        prev.map((bio) =>
          bio.id === selectedBiomedical.id ? selectedBiomedical : bio
        )
      );
    }
    setShowEditor(false);
  };

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <Text fontSize="xl" fontWeight="bold" color="white" textAlign="center" mb={6}>
        Lista de Biomédicos participantes do plano
      </Text>

      <VStack spacing={4} align="stretch" maxW="600px" mx="auto">
        {biomedicals.map((biomedical) => (
          <Flex
            key={biomedical.id}
            justify="space-between"
            align="center"
            bg={lineBg}
            p={2}
            borderBottom="1px solid white"
          >
            <HStack>
              <Text fontWeight="medium" color="white">
                {biomedical.name}
              </Text>
              {biomedical.requestedUpdate && (
                <HStack spacing={1}>
                  <Badge bg="yellow.400" color="black">!</Badge>
                  <Text fontSize="sm" color="white">
                    Solicitou alteração de dados
                  </Text>
                </HStack>
              )}
            </HStack>
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
          <Box
            mt={4}
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
          >
            <Text fontSize="lg" fontWeight="bold" mb={2} color={'black'}>
              Editar Biomédico
            </Text>
            <Input
              placeholder="Biomedical name"
              value={selectedBiomedical.name}
              onChange={(e) =>
                setSelectedBiomedical((prev) =>
                  prev ? { ...prev, name: e.target.value } : prev
                )
              }
              mb={4}
              color={'black'}
            />
            <HStack justify="flex-end">
              <Button colorScheme="blue" onClick={handleSave} bg={'blue.500'} color="white" _hover={{ bg: 'blue.600' }}>
                Salvar
              </Button>
              <Button variant="ghost" onClick={() => setShowEditor(false)} bg={'gray.500'} color="white" _hover={{ bg: 'gray.600' }}>
                Cancelar
              </Button>
            </HStack>
          </Box>
        )}
      </VStack>

      <Flex justify="center" mt={6}>
        <Button bg="green.500" color="white" _hover={{ bg: 'green.600' }} px={8} py={6} fontWeight="bold">
          Cadastrar
        </Button>
      </Flex>

      <Text fontSize="sm" color="white" mt={4} textAlign="center">
        2 / 10
      </Text>
    </Box>
  );
};

export default BiomedicalPage;
