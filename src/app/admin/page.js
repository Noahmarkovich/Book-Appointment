"use client";

import { useEffect, useState } from "react";
import { getPatients, getPatientsTreatments } from "../services/service";
import { AdminTable } from "@/components/admin-table";

export default function Admin() {
  const [patients, setPatients] = useState();
  const [searchInput, setSearchInput] = useState(null);

  useEffect(() => {
    const patients = getPatients(searchInput);
    setPatients(patients);
  }, [searchInput]);

  function handleSearchChange(ev) {
    setSearchInput(ev.target.value);
  }

  return (
    <section className="admin-page">
      <div className="admin-table-container">
        <AdminTable
          patients={patients}
          setPatients={setPatients}
          handleSearchChange={handleSearchChange}
        />
      </div>
    </section>
  );
}
