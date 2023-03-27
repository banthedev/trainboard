import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase';
const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // Creates user
  function createUser (email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign-in Hook
  function signIn (email, password) {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    // Exposes functions into all components via the context provier
    <UserContext.Provider value={{ createUser, user, logout, signIn, resetPassword }}>
      {/* Don't render until user */}
      {!loading && children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};