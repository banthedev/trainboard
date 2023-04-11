import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    deleteUser
} from 'firebase/auth';
import { auth } from '../firebase';

import { addWorkoutToDocument, addUserToCollection } from './StoreContext';

const UserContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    // Creates user
    function createUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign-in Hook
    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Logs out user
    function logout() {
        return signOut(auth)
    }

    // Reset Password
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function getUserId() {
        return user.uid;
    }

    // Delete User
    function deleteAccount() {
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            logout();
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const provided_values = {
        createUser,
        user,
        logout,
        signIn,
        resetPassword,
        addUserToCollection,
        addWorkoutToDocument,
        getUserId,
        deleteAccount
        // getUsername,
        // removeWorkoutFromDocument,
    }

    return (
        // Exposes functions into all components via the context provider
        <UserContext.Provider value={provided_values}>
            {/* Don't render until user */}
            {!loading && children}
        </UserContext.Provider>
    );
};


export const UserAuth = () => {
    return useContext(UserContext);
};