"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { AdminTable } from "@/components/admin-table";
import { AuthContext } from "@/context/authContext";

export default function Admin() {
  const [patients, setPatients] = useState();
  const [treatments, setTreatments] = useState();
  const [searchInput, setSearchInput] = useState("");
  const theme = useContext(AuthContext);
  const { patient, setPatient } = theme;

  useEffect(() => {
    getPatients();
    getTreatments();
  }, []);

  const filteredPatients = useMemo(() => {
    if (searchInput) {
      const searchTerm = searchInput.toLowerCase();
      return patients.filter((patient) => {
        const fullNameMatch = patient.fullName
          .toLowerCase()
          .includes(searchTerm);
        const emailMatch = patient.email.toLowerCase().includes(searchTerm);
        if (fullNameMatch || emailMatch) {
          delete patient.password;
          return patient;
        }
      });
    }
  }, [searchInput, patients]);
  async function getPatients() {
    const res = await fetch("/api/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const patients = await res.json();
    setPatients(patients);
  }
  async function getTreatments() {
    const res = await fetch("/api/admin/treatments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const treatments = await res.json();
    setTreatments(treatments);
  }

  function handleSearchChange(ev) {
    setSearchInput(ev.target.value);
  }
  console.log();
  return (
    <section className="admin-page">
      <div className="admin-table-container">
        <AdminTable
          patients={filteredPatients ?? patients}
          setPatients={setPatients}
          treatments={treatments}
          handleSearchChange={handleSearchChange}
        />
      </div>
    </section>
  );
}
