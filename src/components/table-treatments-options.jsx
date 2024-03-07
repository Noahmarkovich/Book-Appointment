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

export function TableTreatmentsOptions({ patientTreatments, editPatientId }) {
  const theme = useTheme();
  const [currentTreatments, setCurrentTreatments] = useState([]);
  const [treatments, setTreatments] = useState();

  useEffect(() => {
    const treatments = getTreatments();
    setTreatments(treatments);
  }, []);

  useEffect(() => {
    if (treatments) {
      const currentTreatments = patientTreatments.map((patientTreatment) => {
        return treatments.find(
          (treatment) => patientTreatment.treatmentId === treatment.id
        );
      });
      setCurrentTreatments(currentTreatments);
    }
  }, [patientTreatments, treatments]);

  function handleChange(ev) {
    const { value } = ev.target;
    console.log(value);
  }

  function getTreatmentsTypes(treatments) {
    const types = treatments.map((treatment) => treatment.type);
    return types.join(", ");
  }

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
        disabled={editPatientId !== patientTreatments[0]?.patientId}
      >
        {treatments?.map((treatment) => (
          <MenuItem key={treatment.treatmentId} value={treatment}>
            <Checkbox
              checked={currentTreatments.find(
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
