/**
 * Mock function to check if a domain is available
 * @param domain The domain name to check
 * @returns Promise that resolves to true if domain is available, false otherwise
 */
export const isDomainAvailable = async (domain: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
    
    // Simple mock that makes some domains available and others not
    // In a real app, this would call an actual domain availability API
    const hash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % 3 !== 0; // Make roughly 2/3 of domains "available"
  };