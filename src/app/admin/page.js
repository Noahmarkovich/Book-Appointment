"use client";

import { useEffect, useState } from "react";
import { getPatients, getPatientsTreatments } from "../services/service";
import { AdminTable } from "@/components/admin-table";

export default function Admin() {
  const [patients, setPatients] = useState();
  const [patientsTreatments, setPatientsTreatments] = useState();

  useEffect(() => {
    const patients = getPatients();
    setPatients(patients);
  }, []);
  useEffect(() => {
    const patientsTreatments = getPatientsTreatments();
    setPatientsTreatments(patientsTreatments);
  }, [patients]);

  return (
    <section className="admin-page">
      <div className="admin-table-container">
        <AdminTable
          patients={patients}
          patientsTreatments={patientsTreatments}
        />
      </div>
    </section>
  );
}
