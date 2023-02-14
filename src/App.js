import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import HomePage from './pages/Home';
function App() {
    return (
        <ChakraProvider>
            <div className="App">
                <HomePage />
            </div>
        </ChakraProvider>
    );
}

export default App;
