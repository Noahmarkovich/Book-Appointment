"use client";
import {
  getPatient,
  getPatientById,
  getPatientTreatments,
  getTreatments,
  removePatient,
  updatePatientTreatments,
} from "@/app/services/service";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PatientTreatmentsInput } from "./table-treatments-options";

export function AdminTable({ patients, setPatients }) {
  const [treatments, setTreatments] = useState();
  const [editPatientState, setEditPatientState] = useState(null);

  useEffect(() => {
    const treatments = getTreatments();
    setTreatments(treatments);
  }, []);

  function editPatient(patientId) {
    setEditPatientState({
      id: patientId,
      treatments: getPatientById(patientId).treatments.map(
        (patientTreatment) => {
          return treatments.find(
            (treatment) => patientTreatment.treatmentId === treatment.id
          );
        }
      ),
    });
  }

  function onSubmitEdit() {
    const patients = updatePatientTreatments(
      editPatientState.id,
      editPatientState.treatments
    );
    setPatients(patients);
    setEditPatientState(null);
  }

  function onRemovePatient(patientId) {
    const updatedPatients = removePatient(patientId);
    setPatients(updatedPatients);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone number</TableCell>
            <TableCell align="center">Treatments</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients?.map((patient) => (
            <TableRow
              key={patient.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {patient.fullName}
              </TableCell>
              <TableCell align="center">{patient.email}</TableCell>
              <TableCell align="center">
                {patient.phone ?? patient.phoneNumber}
              </TableCell>
              <TableCell align="center">
                <PatientTreatmentsInput
                  patientTreatments={patient.treatments}
                  treatments={treatments}
                  editedTreatments={
                    editPatientState?.id === patient.id
                      ? editPatientState?.treatments
                      : undefined
                  }
                  setEditedTreatments={(treatments) =>
                    setEditPatientState({
                      id: patient.id,
                      treatments,
                    })
                  }
                />
              </TableCell>
              <TableCell align="left">
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ justifyContent: "center" }}
                >
                  {editPatientState?.id === patient.id && (
                    <Button onClick={() => setEditPatientState(null)}>
                      Cancel
                    </Button>
                  )}
                  {editPatientState?.id === patient.id ? (
                    <Button onClick={() => onSubmitEdit()}>Save</Button>
                  ) : (
                    <Button onClick={() => editPatient(patient.id)}>
                      Edit
                    </Button>
                  )}
                  <Button
                    onClick={() => onRemovePatient(patient.id)}
                    variant="contained"
                  >
                    Delete patient
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
