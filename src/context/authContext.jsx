"use client";
import { getCookie } from "@/app/services/service";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  patient: "",
  setPatient: () => {},
  admin: "",
  setAdmin: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [patient, setPatient] = useState(
    getCookie("patient") ? JSON.parse(getCookie("patient")) : ""
  );
  const [admin, setAdmin] = useState(
    getCookie("admin") ? JSON.parse(getCookie("admin")) : ""
  );

  return (
    <AuthContext.Provider value={{ patient, setPatient, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
