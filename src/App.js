import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';
import Explore from './pages/Explore';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import WorkoutCreator from './pages/WorkoutCreator';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <AuthProvider>
                    <div className="App">
                        <Routes>
                            {/* Landing Page */}
                            <Route path="/" element={<HomePage />} />
                            {/* User Auth */}
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/create" element={<WorkoutCreator />} />
                            {/* User Logged in */}
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/explore" element={<Explore />} />
                        </Routes>
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
