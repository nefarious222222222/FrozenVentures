import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(() => {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    return userId ? { userId, userRole } : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('userRole', user.userRole);
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
    }
  }, [user]);

  const addUser = (newUserId, newUserRole) => {
    setUser({ userId: newUserId, userRole: newUserRole });
  };

  const clearUser = () => {
    setUser(null);
  };

  const contextValue = {
    user,
    addUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};