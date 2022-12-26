import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [unlock, setUnlock] = useState(0);
  const [betacoins, setBetacoins] = useState(0);

  return (
    <Context.Provider value={{ unlock, setUnlock, betacoins, setBetacoins }}>
      {props.children}
    </Context.Provider>
  );
};
