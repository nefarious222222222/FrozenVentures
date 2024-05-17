import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId');
  });
  const [isUserIdSet, setIsUserIdSet] = useState(() => {
    return !!localStorage.getItem('userId');
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  const addUserId = (newUserId) => {
    if (!isUserIdSet) {
      setUserId(newUserId);
      setIsUserIdSet(true);
    } else {
      console.warn("User ID has already been set and cannot be changed.");
    }
  };

  const clearUser = () => {
    setUserId(null);
    setIsUserIdSet(false);
  };

  const contextValue = {
    userId,
    addUserId,
    clearUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};