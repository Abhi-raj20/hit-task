"use client";
import { useState } from 'react';
import { 
  VStack,  
  Button, 
  useToast,
  useBreakpointValue,
  Tooltip,
  SimpleGrid
} from '@chakra-ui/react';
// import useToast from "@chakra-ui/react-use-toast";

import { 
  DeleteIcon, 
  CopyIcon, 
  StarIcon, 
  SmallCloseIcon, 
  CheckIcon 
} from '@chakra-ui/icons';

interface ActionButtonsProps {
  domains: Array<{
    name: string;
    isAvailable: boolean;
    isChecking: boolean;
  }>;
  numDomainsRequired: number;
  onClearCart: () => void;
  onRemoveUnavailable: () => void;
  onKeepBest: () => void;
  onPurchase: () => void;
}

export default function ActionButtons({
  domains,
  numDomainsRequired,
  onClearCart,
  onRemoveUnavailable,
  onKeepBest,
  onPurchase
}: ActionButtonsProps) {
  const toast = useToast();
  const [isCopying, setIsCopying] = useState(false);
  
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  
  const isPurchaseDisabled = domains.length !== numDomainsRequired;
  const isCartEmpty = domains.length === 0;
  const hasUnavailableDomains = domains.some(d => !d.isAvailable && !d.isChecking);
  const isOverLimit = domains.length > numDomainsRequired;
  
  const copyDomainsToClipboard = async () => {
    if (isCartEmpty) {
      toast({
        title: 'Cart is empty',
        description: 'Add some domains to copy',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    
    setIsCopying(true);
    try {
      const domainNames = domains.map(d => d.name).join(', ');
      await navigator.clipboard.writeText(domainNames);
      
      toast({
        title: 'Copied!',
        description: 'Domains copied to clipboard',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Copy failed',
        description: 'Failed to copy to clipboard',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsCopying(false);
    }
  };
  
  return (
    <VStack spacing={4} align="stretch">
      <Tooltip 
        label={isPurchaseDisabled ? `You need exactly ${numDomainsRequired} domains to purchase` : 'Purchase these domains'}
        isDisabled={!isPurchaseDisabled}
      >
        <Button 
          colorScheme="green" 
          isDisabled={isPurchaseDisabled}
          onClick={onPurchase}
          size="lg"
          leftIcon={<CheckIcon />}
        >
          Purchase Domains
        </Button>
      </Tooltip>
      
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2}>
        <Tooltip label="Remove all domains from cart">
          <Button 
            colorScheme="red" 
            variant="outline"
            size={buttonSize}
            isDisabled={isCartEmpty}
            onClick={onClearCart}
            leftIcon={<DeleteIcon />}
          >
            Clear Cart
          </Button>
        </Tooltip>
        
        <Tooltip label="Remove all unavailable domains">
          <Button 
            colorScheme="orange" 
            variant="outline"
            size={buttonSize}
            isDisabled={isCartEmpty || !hasUnavailableDomains}
            onClick={onRemoveUnavailable}
            leftIcon={<SmallCloseIcon />}
          >
            Remove Unavailable
          </Button>
        </Tooltip>
        
        <Tooltip label="Copy all domains to clipboard">
          <Button 
            colorScheme="blue" 
            variant="outline"
            size={buttonSize}
            isDisabled={isCartEmpty}
            isLoading={isCopying}
            onClick={copyDomainsToClipboard}
            leftIcon={<CopyIcon />}
          >
            Copy to Clipboard
          </Button>
        </Tooltip>
        
        <Tooltip label={`Keep only the ${numDomainsRequired} best domains by priority`}>
          <Button 
            colorScheme="purple" 
            variant="outline"
            size={buttonSize}
            isDisabled={!isOverLimit}
            onClick={onKeepBest}
            leftIcon={<StarIcon />}
          >
            Keep Best Domains
          </Button>
        </Tooltip>
      </SimpleGrid>
    </VStack>
  );
}