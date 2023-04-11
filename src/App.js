import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import ExplorePage from './pages/Explore';
import HomePage from './pages/Home';
import AboutUs from './pages/AboutUs';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import WorkoutCreator from './pages/WorkoutCreator';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Favoriteworkouts from './pages/Favoriteworkouts';
import Myworkouts from './pages/Myworkouts';
import WorkoutView from './pages/WorkoutView';
import Profile from './pages/Profile';
import DeleteAccount from './pages/DeleteAccount';
import ChangePassword from './pages/ChangePassword';

import ProtectedRoute from './ProtectedRoute';
import ResetPassword from './pages/ResetPassword';

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <AuthProvider>
                    <div className="App">
                        <Routes>
                            {/* Landing Page */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/aboutus" element={<AboutUs />} />

                            {/* User Auth */}
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            {/* User Logged in */}
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />
                            <Route path="/changepassword" element={
                                <ProtectedRoute>
                                    <ChangePassword />
                                </ProtectedRoute>
                            } />
                            <Route path="/deleteaccount" element={
                                <ProtectedRoute>
                                    <DeleteAccount />
                                </ProtectedRoute>
                            } />
                            <Route path="/favoriteworkouts" element={
                                <ProtectedRoute>
                                    <Favoriteworkouts />
                                </ProtectedRoute>
                            } />
                            <Route path="/myworkouts" element={
                                <ProtectedRoute>
                                    <Myworkouts />
                                </ProtectedRoute>
                            } />
                            <Route path="/explore" element={
                                <ProtectedRoute>
                                    <ExplorePage />
                                </ProtectedRoute>
                            } />
                            <Route path="/create" element={
                                <ProtectedRoute>
                                    <WorkoutCreator />
                                </ProtectedRoute>
                            }/>

                            {/* Workouts */}
                            <Route path="/workouts/:workoutId" element={
                                <ProtectedRoute>
                                    <WorkoutView />
                                </ProtectedRoute>
                            } 
                            />
                        </Routes>
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
