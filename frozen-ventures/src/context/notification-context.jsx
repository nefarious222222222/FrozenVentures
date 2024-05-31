import React, { createContext, useState } from 'react';

export const ActiveItemContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState('performance');

  return (
    <ActiveItemContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </ActiveItemContext.Provider>
  );
};