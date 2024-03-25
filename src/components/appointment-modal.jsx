import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export function AppointmentModal({
  open,
  handleClose,
  patientTreatments,
  appointmentToEdit,
  setAppointmentToEdit,
  onSubmitAppointment,
  deleteAppointment,
  error,
  setError,
  checkIfOverlap,
}) {
  function handleChange(input) {
    const startDate = new Date(input.$d);
    let endDate = new Date(input.$d);
    const currentTreatment = patientTreatments.find(
      (treatment) => treatment.label === appointmentToEdit.title
    );

    endDate = new Date(
      endDate.setMinutes(endDate.getMinutes() + currentTreatment.duration)
    );

    const isValidEndTime = isWithinBusinessHours(endDate);
    if (!isValidEndTime) {
      setError("Appointment is out of office hours");
      setAppointmentToEdit({
        ...appointmentToEdit,
        end: "",
        start: startDate,
      });
      return;
    }

    const isOverlap = checkIfOverlap(endDate);
    if (isOverlap) {
      setError("Appointments can not overlap");
      setAppointmentToEdit({
        ...appointmentToEdit,
        end: "",
        start: startDate,
      });
      return;
    }
    setError(null);

    setAppointmentToEdit({
      ...appointmentToEdit,
      end: endDate,
      start: startDate,
    });
  }
  function isWithinBusinessHours(end) {
    var businessHours = [
      {
        daysOfWeek: [0, 1, 2, 4],
        startTime: "09:00",
        endTime: "18:00",
      },
      {
        daysOfWeek: [3],
        startTime: "09:00",
        endTime: "14:00",
      },
    ];

    const businessTime = businessHours.find((business) =>
      business.daysOfWeek.includes(end.getDay())
    );

    const isValidEndTime =
      end
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(/AM|PM/, "") <= businessTime.endTime &&
      end
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(/AM|PM/, "") > businessTime.startTime;

    return isValidEndTime;
  }

  function handleSelectChange(ev, value) {
    if (!value) {
      setError("You must pick a treatment");
      return;
    }
    setError(null);

    const currentDate = new Date(appointmentToEdit.start);
    const endDate = new Date(
      currentDate.setMinutes(currentDate.getMinutes() + value.duration)
    );
    const isValidEndTime = isWithinBusinessHours(endDate);
    if (!isValidEndTime) {
      setError("Appointment is out of office hours");
      setAppointmentToEdit({
        ...appointmentToEdit,
        end: "",
        title: value.label,
      });
      return;
    }
    const isOverlap = checkIfOverlap(endDate);
    if (isOverlap) {
      setError("Appointments can not overlap");
      setAppointmentToEdit({
        ...appointmentToEdit,
        end: "",
        title: value.label,
      });
      return;
    }
    setAppointmentToEdit({
      ...appointmentToEdit,
      end: endDate,
      title: value.label,
    });
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {appointmentToEdit.id
            ? "Update your appointment"
            : "Book an appointment"}
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={patientTreatments}
          value={appointmentToEdit.id && appointmentToEdit?.title}
          isOptionEqualToValue={(option, value) =>
            option === value || option.label === appointmentToEdit.title
          }
          getOptionDisabled={(option) => option.isDisable}
          onChange={handleSelectChange}
          sx={{ width: "100%", marginTop: "20px" }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Select treatment" />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <DateTimePicker
              label="From"
              sx={{ width: "45%" }}
              onChange={handleChange}
              value={dayjs(appointmentToEdit.start)}
            />
            <div>-</div>
            <DateTimePicker
              label="To"
              sx={{ width: "45%" }}
              value={dayjs(appointmentToEdit.end)}
            />
          </div>
        </LocalizationProvider>
        {error && (
          <div style={{ color: "red", marginTop: "15px" }}>{error}</div>
        )}
        <Stack
          sx={{ marginTop: "15px" }}
          spacing={2}
          direction="row"
          justifyContent="flex-end"
        >
          {appointmentToEdit.id && (
            <Button onClick={deleteAppointment} variant="text">
              Delete
            </Button>
          )}

          <Button onClick={onSubmitAppointment} variant="outlined">
            {appointmentToEdit.id ? "Update" : "Submit"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
