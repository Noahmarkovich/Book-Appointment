import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { typographyTheme } from "@/styles/theme/muiTheme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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

const daysDictionary = [
  {
    0: "Sunday",
  },
  { 1: "Monday" },
  { 2: "Tuesday" },
  { 3: "Wednesday" },
  { 4: "Thursday" },
  { 5: "Friday" },
  { 6: "Saturday" },
];

export function ManageContentForm({
  onSaveEdit,
  currentData,
  isEditMode,
  currentContentId,
  handleMultipleChange,
  handleSingleChange,
  handleSelectTimeChange,
  startAddMode,
  onEditData,
  onCancelEdit,
}) {
  return (
    <form className="edit-data-form" onSubmit={onSaveEdit}>
      <Stack direction="row" justifyContent="flex-end" mb="10px">
        {!isEditMode && (
          <Button
            onClick={onEditData}
            color="black"
            title="Edit data"
            sx={{ minWidth: "fit-content", padding: "5px" }}
          >
            <ModeEditOutlineIcon />
          </Button>
        )}

        {isEditMode && (
          <Button
            type="submit"
            color="black"
            sx={{ minWidth: "fit-content", padding: "5px" }}
            title="Save changes"
          >
            <SaveIcon />
          </Button>
        )}
        {isEditMode && (
          <Button
            color="black"
            onClick={onCancelEdit}
            title="Cancel changes"
            sx={{ minWidth: "fit-content", padding: "5px" }}
          >
            <CancelIcon />
          </Button>
        )}
      </Stack>
      <div className="form-container">
        {currentData.map((inputConfig) => {
          return (
            <div key={inputConfig.id} className="inputs">
              <ThemeProvider theme={typographyTheme}>
                <Typography variant="paragraphLightColor">
                  {inputConfig.label}
                </Typography>
              </ThemeProvider>
              {typeof inputConfig.value === "string" ||
              typeof inputConfig.value === "number" ? (
                <TextField
                  value={inputConfig.value}
                  name={inputConfig.id}
                  multiline
                  rows={4}
                  onChange={handleSingleChange}
                  disabled={!isEditMode}
                />
              ) : (
                inputConfig.value.map((input, inputIndex) => {
                  return (
                    <div key={input.id} className="input">
                      {"title" in input && (
                        <TextField
                          value={input.title}
                          label="Title"
                          name="title"
                          disabled={!isEditMode}
                          onChange={(ev) =>
                            handleMultipleChange(ev, inputConfig.id, inputIndex)
                          }
                        />
                      )}
                      {"p" in input && (
                        <TextField
                          value={input.p}
                          label="Paragraph"
                          multiline
                          rows={4}
                          name="p"
                          disabled={!isEditMode}
                          onChange={(ev) =>
                            handleMultipleChange(ev, inputConfig.id, inputIndex)
                          }
                        />
                      )}
                      {"duration" in input && (
                        <TextField
                          value={input.duration}
                          label="Duration"
                          type="number"
                          name="duration"
                          disabled={!isEditMode}
                          onChange={(ev) =>
                            handleMultipleChange(ev, inputConfig.id, inputIndex)
                          }
                        />
                      )}
                      {"price" in input && (
                        <TextField
                          value={input.price}
                          label="Price"
                          type="number"
                          name="price"
                          disabled={!isEditMode}
                          onChange={(ev) =>
                            handleMultipleChange(ev, inputConfig.id, inputIndex)
                          }
                        />
                      )}
                      {"startTime" in input && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["TimePicker"]}>
                            <Box
                              sx={{
                                flexDirection: "column",
                                display: "flex",
                                gap: "20px",
                              }}
                            >
                              {" "}
                              <TimePicker
                                label="Office start time"
                                views={["hours", "minutes"]}
                                disabled={!isEditMode}
                                ampm={false}
                                name="startTime"
                                value={dayjs(
                                  new Date().setHours(
                                    input.startTime.split(":")[0],
                                    input.startTime.split(":")[1]
                                  )
                                )}
                                onChange={(ev) =>
                                  handleSelectTimeChange(
                                    ev,
                                    inputConfig.id,
                                    inputIndex,
                                    "startTime"
                                  )
                                }
                              />
                              <TimePicker
                                label="Office end time"
                                disabled={!isEditMode}
                                ampm={false}
                                name="endTime"
                                value={dayjs(
                                  new Date().setHours(
                                    input.endTime.split(":")[0],
                                    input.endTime.split(":")[1]
                                  )
                                )}
                                onChange={(ev) =>
                                  handleSelectTimeChange(
                                    ev,
                                    inputConfig.id,
                                    inputIndex,
                                    "endTime"
                                  )
                                }
                              />
                            </Box>
                          </DemoContainer>
                        </LocalizationProvider>
                      )}
                      {currentContentId === "appointments" && (
                        <FormControl
                          // key={input.id}
                          sx={{ m: 1, width: 300 }}
                        >
                          <InputLabel id="demo-multiple-chip-label">
                            Business days
                          </InputLabel>
                          <Select
                            disabled={!isEditMode}
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={input.daysOfWeek}
                            name="daysOfWeek"
                            onChange={(ev) =>
                              handleMultipleChange(
                                ev,
                                inputConfig.id,
                                inputIndex
                              )
                            }
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Business days"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip
                                    key={value}
                                    label={
                                      daysDictionary.find(
                                        (day, index) => value === index
                                      )[value]
                                    }
                                  />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {daysDictionary.map((day, index) => (
                              <MenuItem key={day} value={index}>
                                {day[index]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </div>
                  );
                })
              )}
              {isEditMode && Array.isArray(inputConfig.value) && (
                <Button
                  title="Add new item"
                  onClick={() =>
                    startAddMode(inputConfig.value[0], inputConfig)
                  }
                >
                  <AddIcon />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
}
