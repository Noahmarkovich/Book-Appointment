"use client";

import { cookieCheck } from "@/app/utils/cookies";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  patient: "",
  setPatient: () => {},
  admin: "",
  setAdmin: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [patient, setPatient] = useState();
  // getCookie("patient") ? JSON.parse(getCookie("patient")) : ""
  const [admin, setAdmin] = useState();
  // getCookie("user") ? JSON.parse(getCookie("user")) : ""

  useEffect(() => {
    getTheCookie();
  }, []);

  async function getTheCookie() {
    const patientCookie = await cookieCheck("patient");
    const userCookie = await cookieCheck("user");
    if (patientCookie) {
      setPatient(JSON.parse(patientCookie));
    }
    if (userCookie) {
      setAdmin(JSON.parse(userCookie));
    }
  }

  return (
    <AuthContext.Provider value={{ patient, setPatient, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
