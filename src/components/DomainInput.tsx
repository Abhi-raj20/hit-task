"use client";

import { useState } from 'react';
import {
  Input,
  Button,
  HStack,
   
} from "@chakra-ui/react";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl,FormErrorMessage,FormHelperText } from "@chakra-ui/form-control";

interface DomainInputProps {
  onAddDomain: (domain: string) => void;
}

export default function DomainInput({ onAddDomain }: DomainInputProps) {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const validateDomain = (domain: string): boolean => {
    // Check if it's a valid domain format
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*\.(com|xyz|app)$/;
    return domainRegex.test(domain);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();
    
    if (!trimmedInput) {
      setError('Please enter a domain');
      return;
    }
    
    if (!validateDomain(trimmedInput)) {
      setError('Invalid domain. Only .com, .xyz, or .app domains are allowed');
      return;
    }
    
    onAddDomain(trimmedInput);
    setInput('');
    setError('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={!!error}>
        <HStack>
          <InputGroup>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter domain (e.g., example.com)"
              size="md"
            />
            <InputRightElement width="4.5rem">
              <Button 
                h="1.75rem" 
                size="sm" 
                type="submit"
                colorScheme="blue"
              >
                Add
              </Button>
            </InputRightElement>
          </InputGroup>
        </HStack>
        
        {error ? (
          <FormErrorMessage>{error}</FormErrorMessage>
        ) : (
          <FormHelperText>
            Enter a domain name ending with .com, .app, or .xyz
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
}