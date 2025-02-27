"use client";
import { Box, Progress, Text, Badge, HStack, Tooltip } from '@chakra-ui/react';

interface CartSummaryProps {
  currentCount: number;
  requiredCount: number;
}

export default function CartSummary({ currentCount, requiredCount }: CartSummaryProps) {
  const isCorrectCount = currentCount === requiredCount;
  const isTooMany = currentCount > requiredCount;
  
  const progressValue = Math.min((currentCount / requiredCount) * 100, 100);
  
  return (
    <Box>
      <HStack justifyContent="space-between" mb={2}>
        <Text fontWeight="bold">
          Domain Cart: {currentCount} / {requiredCount}
        </Text>
        
        {isCorrectCount && (
          <Badge colorScheme="green" px={2} py={1} borderRadius="full">
            Ready to purchase!
          </Badge>
        )}
        
        {isTooMany && (
          <Tooltip label={`You need exactly ${requiredCount} domains. Please remove ${currentCount - requiredCount}.`}>
            <Badge colorScheme="orange" px={2} py={1} borderRadius="full">
              Too many domains
            </Badge>
          </Tooltip>
        )}
        
        {!isCorrectCount && !isTooMany && (
          <Tooltip label={`Add ${requiredCount - currentCount} more domain(s)`}>
            <Badge colorScheme="blue" px={2} py={1} borderRadius="full">
              Need more domains
            </Badge>
          </Tooltip>
        )}
      </HStack>
      
      <Progress 
        value={progressValue} 
        colorScheme={isCorrectCount ? 'green' : isTooMany ? 'orange' : 'blue'} 
        size="md" 
        borderRadius="md"
        hasStripe={isCorrectCount}
        isAnimated={isCorrectCount}
      />
    </Box>
  );
}