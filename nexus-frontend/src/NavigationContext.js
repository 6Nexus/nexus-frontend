import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [pilha, setPilha] = useState([]);

  const addToPilha = (url) => {
    if (pilha[pilha.length - 1] !== url) {
      setPilha([...pilha, url]);
    }
  };

  const removeFromPilha = () => {
    setPilha((prevPilha) => prevPilha.slice(0, -1));
  };

  return (
    <NavigationContext.Provider value={{ pilha, addToPilha, removeFromPilha }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
