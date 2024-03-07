"use client";
import { getPatientTreatments } from "@/app/services/service";
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
import { useState } from "react";
import { TableTreatmentsOptions } from "./table-treatments-options";

export function AdminTable({ patients, patientsTreatments }) {
  const [editPatientId, setEditPatientId] = useState();
  function findPatientTreatments(patientId) {
    const patientTreatments = getPatientTreatments(patientId);
    return patientTreatments;
  }

  console.log(editPatientId);
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
                <TableTreatmentsOptions
                  patientTreatments={findPatientTreatments(patient.id)}
                  editPatientId={editPatientId}
                />
              </TableCell>
              <TableCell align="left">
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ justifyContent: "center" }}
                >
                  {editPatientId === patient.id && (
                    <Button onClick={() => setEditPatientId(null)}>
                      Cancel
                    </Button>
                  )}
                  {editPatientId === patient.id ? (
                    <Button onClick={() => console.log("hi")}>Save</Button>
                  ) : (
                    <Button onClick={() => setEditPatientId(patient.id)}>
                      Edit
                    </Button>
                  )}
                  <Button variant="contained">Delete patient</Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
