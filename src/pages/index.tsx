import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import Challenge from '../components/challenge';

const Home: NextPage = () => {
  return (
    <ChakraProvider >
      <Challenge numDomainsRequired={5} />
     </ChakraProvider>
  );
};

export default Home;