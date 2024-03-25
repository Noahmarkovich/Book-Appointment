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
  Avatar,
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
import { useEffect, useState } from "react";
import { PatientTreatmentsInput } from "./table-treatments-options";

export function AdminTable({ patients, setPatients, handleSearchChange }) {
  const [treatments, setTreatments] = useState();
  const [editPatientState, setEditPatientState] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const treatments = getTreatments();
    setTreatments(treatments);
  }, []);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#e3e3e3bd",
          padding: "5px 10px",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>Patients management</Typography>
        <TextField
          id="standard-search"
          label="Search by name or email"
          type="search"
          variant="standard"
          onChange={handleSearchChange}
        />
      </Box>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={patients?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
