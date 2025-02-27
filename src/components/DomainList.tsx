"use client";
import { VStack, Text } from '@chakra-ui/react';
import { Box } from "@chakra-ui/react"; 
import DomainItem from './DomainItem';

interface DomainListProps {
  domains: Array<{
    name: string;
    isAvailable: boolean;
    isChecking: boolean;
  }>;
  onDeleteDomain: (domainName: string) => void;
}

export default function DomainList({ domains, onDeleteDomain }: DomainListProps) {
  if (domains.length === 0) {
    return (
      <Box 
        p={4} 
        borderWidth="1px" 
        borderRadius="md" 
        textAlign="center"
      >
        <Text color="gray.500">
          No domains in cart. Add some domains to get started.
        </Text>
      </Box>
    );
  }
  
  return (
    <VStack spacing={2} align="stretch">
      {domains.map((domain) => (
        <DomainItem 
          key={domain.name} 
          domain={domain} 
          onDelete={onDeleteDomain} 
        />
      ))}
    </VStack>
  );
}