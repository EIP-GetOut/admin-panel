import { ChakraProvider } from '@chakra-ui/react';
import Router from '../app/Router';
import { CurrentAccountProvider } from '../services/CurrentAccountContext'

const App = () => (
  <ChakraProvider>
    <CurrentAccountProvider>
      <Router />
    </CurrentAccountProvider>
  </ChakraProvider>
);

export default App;
