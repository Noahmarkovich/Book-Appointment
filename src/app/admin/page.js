"use client";

import { useEffect, useState } from "react";
import { getPatients, getPatientsTreatments } from "../services/service";
import { AdminTable } from "@/components/admin-table";

export default function Admin() {
  const [patients, setPatients] = useState();

  useEffect(() => {
    const patients = getPatients();
    setPatients(patients);
  }, []);

  return (
    <section className="admin-page">
      <div className="admin-table-container">
        <AdminTable patients={patients} setPatients={setPatients} />
      </div>
    </section>
  );
}
