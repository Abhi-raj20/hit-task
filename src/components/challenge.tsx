
"use client";
import { useState, useCallback, useMemo } from 'react';
import { Divider } from '@chakra-ui/layout';
import { Box, VStack, Heading, useToast } from '@chakra-ui/react';
import { isDomainAvailable } from '../lib/resources';
import DomainInput from './DomainInput';
import DomainList from './DomainList';
import CartSummary from './CartSummary';
import ActionButtons from './ActionButtons';

interface ChallengeProps {
  numDomainsRequired: number;
}

interface DomainInfo {
  name: string;
  isAvailable: boolean;
  isChecking: boolean;
}

export default function Challenge({ numDomainsRequired }: ChallengeProps) {
  const [domains, setDomains] = useState<DomainInfo[]>([]);
  const toast = useToast();
  
  // Add domain to the cart
  const addDomain = useCallback(async (domainName: string) => {
    if (domains.some(domain => domain.name === domainName)) {
      toast({
        title: 'Domain already added',
        description: `${domainName} is already in your cart.`,
        status: 'info',
        duration: 3000,
      });
      return;
    }

    setDomains(prev => [
      ...prev, 
      { name: domainName, isAvailable: false, isChecking: true }
    ]);
    
    try {
      const available = await isDomainAvailable(domainName);
      setDomains(prev => 
        prev.map(domain => 
          domain.name === domainName
            ? { ...domain, isAvailable: available, isChecking: false }
            : domain
        )
      );
      
      toast({
        title: `Domain ${available ? 'available' : 'unavailable'}`,
        description: `${domainName} is ${available ? 'available' : 'not available'} for purchase.`,
        status: available ? 'success' : 'warning',
        duration: 3000,
      });
    } catch (error) {
      setDomains(prev => 
        prev.map(domain => 
          domain.name === domainName
            ? { ...domain, isChecking: false }
            : domain
        )
      );
      
      toast({
        title: 'Error',
        description: 'Failed to check domain availability',
        status: 'error',
        duration: 3000,
      });
    }
  }, [domains, toast]);
  
  // Delete a domain from the cart
  const deleteDomain = useCallback((domainName: string) => {
    setDomains(prev => prev.filter(domain => domain.name !== domainName));
    toast({
      title: 'Domain removed',
      description: `${domainName} has been removed from your cart.`,
      status: 'info',
      duration: 2000,
    });
  }, [toast]);

  // Clear all domains in the cart
  const clearCart = useCallback(() => {
    setDomains([]);
    toast({
      title: 'Cart cleared',
      description: 'All domains have been removed from your cart.',
      status: 'info',
      duration: 2000,
    });
  }, [toast]);

  // Remove all unavailable domains
  const removeUnavailable = useCallback(() => {
    const unavailableCount = domains.filter(domain => !domain.isAvailable && !domain.isChecking).length;
    
    if (unavailableCount === 0) {
      toast({
        title: 'No unavailable domains',
        description: 'There are no unavailable domains to remove.',
        status: 'info',
        duration: 2000,
      });
      return;
    }
    
    setDomains(prev => prev.filter(domain => domain.isAvailable || domain.isChecking));
    toast({
      title: 'Unavailable domains removed',
      description: `${unavailableCount} unavailable domain(s) have been removed.`,
      status: 'success',
      duration: 2000,
    });
  }, [domains, toast]);

  // Keep the best domains based on the criteria
  const keepBestDomains = useCallback(() => {
    const sortedDomains = [...domains].sort((a, b) => {
      const getTldPriority = (domain: string): number => {
        if (domain.endsWith('.com')) return 3;
        if (domain.endsWith('.app')) return 2;
        return 1; // .xyz or other TLDs
      };
      
      const aPriority = getTldPriority(a.name);
      const bPriority = getTldPriority(b.name);
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      return a.name.length - b.name.length;
    });
    
    setDomains(sortedDomains.slice(0, numDomainsRequired));
    toast({
      title: 'Kept best domains',
      description: `Now showing the ${numDomainsRequired} best domains based on priority.`,
      status: 'info',
      duration: 3000,
    });
  }, [domains, numDomainsRequired, toast]);

  // Handle purchase action
  const handlePurchase = useCallback(() => {
    toast({
      title: 'Domains purchased!',
      description: `You've purchased ${domains.length} domains: ${domains.map(d => d.name).join(', ')}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }, [domains, toast]);

  // Memoized domain count to optimize re-renders
  const domainCount = useMemo(() => domains.length, [domains]);

  return (
    <Box maxWidth="800px" margin="0 auto" p={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="lg">Domain Shopping Cart</Heading>
        
        <DomainInput onAddDomain={addDomain} />
        <CartSummary currentCount={domainCount} requiredCount={numDomainsRequired} />
        
        <Divider />
        
        <DomainList domains={domains} onDeleteDomain={deleteDomain} />
        
        <Divider />
        
        <ActionButtons 
          domains={domains}
          numDomainsRequired={numDomainsRequired}
          onClearCart={clearCart}
          onRemoveUnavailable={removeUnavailable}
          onKeepBest={keepBestDomains}
          onPurchase={handlePurchase}
        />
      </VStack>
    </Box>
  );
}
