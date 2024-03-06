"use client";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  patient: null,
  setPatient: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [patient, setPatient] = useState();

  return (
    <AuthContext.Provider value={{ patient, setPatient }}>
      {children}
    </AuthContext.Provider>
  );
};
