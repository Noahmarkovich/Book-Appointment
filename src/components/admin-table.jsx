"use client";

import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { PatientTreatmentsInput } from "./table-treatments-options";
import Loading from "@/app/loading";

export function AdminTable({
  patients,
  setPatients,
  handleSearchChange,
  treatments,
}) {
  const [editPatientState, setEditPatientState] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const patientsToPresent = useMemo(() => {
    return patients?.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [page, rowsPerPage, patients]);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function editPatient(patientId) {
    const patient = patients.find((patient) => patient.id === patientId);
    setEditPatientState({
      id: patientId,
      treatments: patient.treatments.map((patientTreatment) => {
        return treatments.find(
          (treatment) => patientTreatment.treatmentId === treatment.id
        );
      }),
    });
  }

  async function onSubmitEdit() {
    const res = await fetch("/api/admin", {
      method: "PUT",
      body: JSON.stringify(editPatientState),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const patients = await res.json();
    setPatients(patients);
    setEditPatientState(null);
  }

  async function onRemovePatient(patientId) {
    const res = await fetch("/api/admin", {
      method: "DELETE",
      body: JSON.stringify(patientId),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedPatients = await res.json();

    setPatients(updatedPatients);
  }

  return (
    <TableContainer component={Paper}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#e3e3e3bd",
          padding: "5px 10px",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} color="#030357">
          Patients management
        </Typography>
        <TextField
          id="standard-search"
          label="Search by name or email"
          type="search"
          variant="standard"
          onChange={handleSearchChange}
        />
      </Box>
      {patientsToPresent ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ textTransform: "uppercase" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Phone number
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Treatments
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientsToPresent?.map((patient) => (
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
                    patientId={patient.id}
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
      ) : (
        <Loading />
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={patients?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
