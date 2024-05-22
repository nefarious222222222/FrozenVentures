import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(() => {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const userShopName = localStorage.getItem('userShopName');
    return userId ? { userId, userRole, userShopName } : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('userRole', user.userRole);
      localStorage.setItem('userShopName', user.userShopName);
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userShopName');
    }
  }, [user]);

  const addUser = (newUserId, newUserRole, newUserShopName) => {
    setUser({ userId: newUserId, userRole: newUserRole, userShopName: newUserShopName });
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