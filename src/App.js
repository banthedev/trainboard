import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';
import Explore from './pages/Explore';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';


function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
