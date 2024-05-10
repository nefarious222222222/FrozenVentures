import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserSignedIn(true);
    } else {
        setCurrentUser(null);
        setUserSignedIn(false);
    } setLoading(false);
  }

  const value = {
    currentUser,
    userSignedIn,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
