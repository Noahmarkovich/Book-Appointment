"use client";
import {
  AppointmentsDictionary,
  HomePageDictionary,
  OurTreatmentsDictionary,
  getData,
  updateData,
} from "@/app/services/admin.service";
import { buttonTheme } from "@/styles/theme/muiTheme";
import {
  Button,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ManageContent() {
  const [data, setData] = useState();
  const [showedData, setShowedData] = useState();
  const [editedData, setEditedData] = useState();
  const [currentContentId, setCurrentContentId] = useState();
  const router = useRouter();

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

  // console.log(data);
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
    console.log(editedData);
    const { value, name, type } = ev.target;
    const currentEditedDataIndex = editedData.findIndex(
      (data) => data.id === mainInputsId
    );
    let currentEditedData = editedData.find((data) => data.id === mainInputsId);
    if (type === "number") {
      currentEditedData.value[inputIndex][name] = +value;
    } else {
      currentEditedData.value[inputIndex][name] = value;
    }
    let newShownData = [...editedData];
    newShownData[currentEditedDataIndex] = currentEditedData;

    setEditedData(newShownData);
  }

  function editData() {
    const duplicateData = JSON.parse(JSON.stringify(showedData));
    setEditedData(duplicateData);
  }

  return (
    <section className="edit-content">
      <ThemeProvider theme={buttonTheme}>
        <div className="data-controllers">
          <Stack direction="column" width={"fit-content"}>
            {data?.map((content) => {
              return (
                <Button
                  variant="text"
                  onClick={() => getSectionData(content.id)}
                  key={content.id}
                  color="black"
                >
                  {content.id}
                </Button>
              );
            })}
          </Stack>
        </div>
        <Button onClick={() => editData()}>Edit</Button>
        {showedData && (
          <form className="edit-data-form" onSubmit={onSaveEdit}>
            <div className="form-container">
              {(editedData ? editedData : showedData).map((inputConfig) => {
                return (
                  <div key={inputConfig.id} className="inputs">
                    <Typography>{inputConfig.label}</Typography>
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
                            {input.title && (
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
                            {input.p && (
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
                            {input.duration && (
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
                            {input.price && (
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
                          </div>
                        );
                      })
                    )}
                  </div>
                );
              })}
            </div>
            <Button type="submit" variant="contained" color="black">
              Save
            </Button>
            <Button
              variant="contained"
              color="black"
              onClick={() => setEditedData(null)}
            >
              Cancel
            </Button>
          </form>
        )}
      </ThemeProvider>
    </section>
  );
}
