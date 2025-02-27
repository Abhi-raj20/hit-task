"use client";
import { HStack, Text, Badge, IconButton, Spinner, Box } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

interface DomainItemProps {
  domain: {
    name: string;
    isAvailable: boolean;
    isChecking: boolean;
  };
  onDelete: (domainName: string) => void;
}

export default function DomainItem({ domain, onDelete }: DomainItemProps) {
  return (
    <HStack 
      justifyContent="space-between" 
      p={3} 
      borderWidth="1px" 
      borderRadius="md"
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
      transition="all 0.2s"
    >
      <Text fontWeight="medium">{domain.name}</Text>
      
      <HStack>
        {domain.isChecking ? (
          <Badge colorScheme="gray" display="flex" alignItems="center">
            <Spinner size="xs" mr={2} />
            Checking...
          </Badge>
        ) : (
          <Badge 
            colorScheme={domain.isAvailable ? 'green' : 'red'}
            variant="solid"
            px={2}
            py={1}
            borderRadius="full"
          >
            {domain.isAvailable ? 'Available' : 'Unavailable'}
          </Badge>
        )}
        
        <IconButton
          aria-label="Delete domain"
          icon={<DeleteIcon />}
          size="sm"
          colorScheme="red"
          variant="ghost"
          onClick={() => onDelete(domain.name)}
        />
      </HStack>
    </HStack>
  );
}