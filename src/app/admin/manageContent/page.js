"use client";
import {
  AppointmentsDictionary,
  HomePageDictionary,
  OurTreatmentsDictionary,
  getData,
  updateData,
} from "@/app/services/admin.service";
import { buttonTheme, typographyTheme } from "@/styles/theme/muiTheme";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { makeId } from "@/app/services/service";

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

export default function ManageContent() {
  const [data, setData] = useState();
  const [showedData, setShowedData] = useState();
  const [editedData, setEditedData] = useState();
  const [currentContentId, setCurrentContentId] = useState();

  useEffect(() => {
    const currentData = getData();
    setData(currentData);
  }, []);

  function getSectionData(contentId) {
    if (contentId === "home-page") {
      setShowedData([...HomePageDictionary]);
    }
    if (contentId === "our-treatments") {
      setShowedData([...OurTreatmentsDictionary]);
    }
    if (contentId === "appointments") {
      setShowedData([...AppointmentsDictionary]);
    }
    setCurrentContentId(contentId);
  }

  function onSaveEdit(ev) {
    ev.preventDefault();
    const newData = updateData(currentContentId, editedData);
    setData(newData);
    setShowedData(editedData);
    setEditedData(null);
  }

  function handleSingleChange(ev) {
    const { name, value } = ev.target;
    const currentEditedDataIndex = editedData.findIndex(
      (data) => data.id === name
    );

    let currentEditedData = editedData.find((data) => data.id === name);
    currentEditedData.value = value;
    let newShownData = [...editedData];
    newShownData[currentEditedDataIndex] = currentEditedData;

    setEditedData(newShownData);
  }

  function handleMultipleChange(ev, mainInputsId, inputIndex) {
    let { value, name, type } = ev.target;
    const currentEditedDataIndex = editedData.findIndex(
      (data) => data.id === mainInputsId
    );
    let currentEditedData = editedData.find((data) => data.id === mainInputsId);
    if (name === "daysOfWeek") {
      typeof value === "string" ? value.split(",") : value;
    }
    value = type === "number" ? +value : value;
    currentEditedData.value[inputIndex][name] = value;

    let newShownData = [...editedData];
    newShownData[currentEditedDataIndex] = currentEditedData;

    setEditedData(newShownData);
  }

  function editData() {
    const duplicateData = JSON.parse(JSON.stringify(showedData));
    setEditedData(duplicateData);
  }

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
  function handleSelectTimeChange(ev, mainInputsId, inputIndex, name) {
    const hour = ev.$H.toString().length === 1 ? "0" + ev.$H : ev.$H;
    const minutes = ev.$m.toString().length === 1 ? "0" + ev.$m : ev.$m;
    const value = hour + ":" + minutes;
    const currentEditedDataIndex = editedData.findIndex(
      (data) => data.id === mainInputsId
    );
    let currentEditedData = editedData.find((data) => data.id === mainInputsId);
    currentEditedData.value[inputIndex][name] = value;

    let newShownData = [...editedData];
    newShownData[currentEditedDataIndex] = currentEditedData;

    setEditedData(newShownData);
  }

  function startAddMode(referenceObject, input) {
    let duplicationObject = { ...referenceObject };
    Object.keys(duplicationObject).forEach(function (key, index) {
      if (typeof duplicationObject[key] === "number") {
        return (duplicationObject[key] = 0);
      } else if (Array.isArray(duplicationObject[key])) {
        return (duplicationObject[key] = []);
      } else {
        return (duplicationObject[key] = "");
      }
    });

    duplicationObject.id = makeId();
    const currentEditedDataIndex = editedData.findIndex(
      (data) => data.id === input.id
    );
    console.log();
    let currentEditedData = input;
    currentEditedData.value = [...currentEditedData.value, duplicationObject];
    let newShownData = [...editedData];
    newShownData[currentEditedDataIndex] = currentEditedData;
    // console.log(newShownData);
    setEditedData(newShownData);
  }

  return (
    <section className="edit-content">
      <ThemeProvider theme={buttonTheme}>
        <div className="data-controllers">
          <Typography
            variant="h6"
            mb={"30px"}
            fontFamily={"Pacifico-Regular"}
            color="#030357"
          >
            Pages
          </Typography>
          <Stack direction="column" width={"fit-content"} spacing={2}>
            {data?.map((content) => {
              return (
                <Button
                  variant="text"
                  onClick={() => getSectionData(content.id)}
                  key={content.id}
                  color="black"
                  sx={
                    content.id === currentContentId && {
                      background: "#030357",
                      color: "white",
                    }
                  }
                >
                  {content.id}
                </Button>
              );
            })}
          </Stack>
        </div>
        <div className="edit-data-container">
          {showedData && (
            <Typography variant="h5" mb={"30px"} color="#030357">
              Data to edit
            </Typography>
          )}
          {showedData && (
            <form className="edit-data-form" onSubmit={onSaveEdit}>
              <Stack direction="row" justifyContent="flex-end" mb="10px">
                {!editedData && (
                  <Button
                    onClick={() => editData()}
                    color="black"
                    title="Edit data"
                    sx={{ minWidth: "fit-content", padding: "5px" }}
                  >
                    <ModeEditOutlineIcon />
                  </Button>
                )}

                {editedData && (
                  <Button
                    type="submit"
                    color="black"
                    sx={{ minWidth: "fit-content", padding: "5px" }}
                    title="Save changes"
                  >
                    <SaveIcon />
                  </Button>
                )}
                {editedData && (
                  <Button
                    color="black"
                    onClick={() => setEditedData(null)}
                    title="Cancel changes"
                    sx={{ minWidth: "fit-content", padding: "5px" }}
                  >
                    <CancelIcon />
                  </Button>
                )}
              </Stack>
              <div className="form-container">
                {(editedData ? editedData : showedData).map((inputConfig) => {
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
                          disabled={!editedData}
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
                                  disabled={!editedData}
                                  onChange={(ev) =>
                                    handleMultipleChange(
                                      ev,
                                      inputConfig.id,
                                      inputIndex
                                    )
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
                                  disabled={!editedData}
                                  onChange={(ev) =>
                                    handleMultipleChange(
                                      ev,
                                      inputConfig.id,
                                      inputIndex
                                    )
                                  }
                                />
                              )}
                              {"duration" in input && (
                                <TextField
                                  value={input.duration}
                                  label="Duration"
                                  type="number"
                                  name="duration"
                                  disabled={!editedData}
                                  onChange={(ev) =>
                                    handleMultipleChange(
                                      ev,
                                      inputConfig.id,
                                      inputIndex
                                    )
                                  }
                                />
                              )}
                              {"price" in input && (
                                <TextField
                                  value={input.price}
                                  label="Price"
                                  type="number"
                                  name="price"
                                  disabled={!editedData}
                                  onChange={(ev) =>
                                    handleMultipleChange(
                                      ev,
                                      inputConfig.id,
                                      inputIndex
                                    )
                                  }
                                />
                              )}
                              {"startTime" in input && (
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
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
                                        disabled={!editedData}
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
                                        disabled={!editedData}
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
                                    disabled={!editedData}
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
                      {editedData && Array.isArray(inputConfig.value) && (
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
          )}
        </div>
      </ThemeProvider>
    </section>
  );
}
