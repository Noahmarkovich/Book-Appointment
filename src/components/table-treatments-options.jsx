import { getTreatments } from "@/app/services/service";
import { useTheme } from "@emotion/react";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//PatientTreatmentsInput

export function PatientTreatmentsInput({
  patientTreatments,
  treatments,
  editedTreatments,
  setEditedTreatments,
}) {
  const theme = useTheme();

  function handleChange(ev) {
    const { value } = ev.target;
    setEditedTreatments(value);
  }

  function getTreatmentsTypes(treatments) {
    const types = treatments.map((treatment) => treatment.type);
    return types.join(", ");
  }
  const currentTreatments =
    editedTreatments ??
    patientTreatments.map((patientTreatment) => {
      return {
        id: patientTreatment.treatmentId,
        type: patientTreatment.label,
      };
    });

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-checkbox-label">Treatments</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={currentTreatments}
        onChange={handleChange}
        input={<OutlinedInput label="Treatments" />}
        renderValue={(selected) => getTreatmentsTypes(selected)}
        MenuProps={MenuProps}
        disabled={!editedTreatments}
      >
        {treatments?.map((treatment) => (
          <MenuItem key={treatment.id} value={treatment}>
            <Checkbox
              checked={currentTreatments?.some(
                (currTreatment) => currTreatment.id === treatment.id
              )}
            />
            <ListItemText primary={treatment.type} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
