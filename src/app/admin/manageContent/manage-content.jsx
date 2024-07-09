"use client";
import { updateData } from "@/app/services/admin.service";
import { buttonTheme } from "@/styles/theme/muiTheme";
import {
  Button,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { makeId } from "@/app/services/service";
import { ManageContentForm } from "@/components/manage-content-form";
import { useRouter } from "next/navigation";

export function ManageContentCmp({ fetchedData, fetchedTreatments }) {
  const [data, setData] = useState(fetchedData);
  const [showedData, setShowedData] = useState();
  const [editedData, setEditedData] = useState();
  const [currentContentId, setCurrentContentId] = useState();
  const router = useRouter();
  const mobileScreenSize = useMediaQuery("(max-width:800px)");
  const mobileMinScreenSize = useMediaQuery("(max-width:640px)");

  function createDictionary(receivedData) {
    const newData = flattenContent(receivedData);
    setShowedData(newData);
  }

  function flattenContent(content, prefix = "", mainKey = "") {
    let result = [];

    for (const key in content) {
      if (typeof content[key] === "object" && !Array.isArray(content[key])) {
        result = result.concat(
          flattenContent(content[key], `${prefix}${key}.`, key)
        );
      } else {
        result.push({
          id: `${prefix}${key}`,
          value: content[key],
          label: mainKey ? mainKey + "- " + key : key,
        });
      }
    }
    return result;
  }

  function getSectionData(contentId) {
    let section = data.find((data) => data.id === contentId);
    if (contentId === "our-treatments") {
      section.content.treatments["treatments"] = fetchedTreatments;
    }

    createDictionary(section.content);

    setCurrentContentId(contentId);
  }

  async function onSaveEdit(ev) {
    ev.preventDefault();
    const savedData = updateData(data, currentContentId, editedData);
    const res = await fetch("/api/admin/manage-content", {
      method: "PUT",
      body: JSON.stringify(savedData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let updatedData = JSON.parse(JSON.stringify(data));
    const returnedData = await res.json();
    const returnedDataIndex = data.find(
      (content) => content.id === returnedData.id
    );
    updatedData[returnedDataIndex] = returnedData;
    createDictionary(returnedData.content);
    setData(updatedData);
    setEditedData(null);
    router.refresh();
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
    let currentEditedData = input;
    currentEditedData.value = [...currentEditedData.value, duplicationObject];
    let newShownData = [...editedData];
    newShownData[currentEditedDataIndex] = currentEditedData;
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
          <Stack
            direction={
              !mobileMinScreenSize && mobileScreenSize ? "row" : "column"
            }
            width={mobileScreenSize ? "100%" : "fit-content"}
            spacing={1}
          >
            {data?.map((content) => {
              return (
                <Button
                  fullWidth={mobileScreenSize}
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
            <ManageContentForm
              onSaveEdit={onSaveEdit}
              currentData={editedData ? editedData : showedData}
              isEditMode={editedData}
              currentContentId={currentContentId}
              handleMultipleChange={handleMultipleChange}
              handleSingleChange={handleSingleChange}
              handleSelectTimeChange={handleSelectTimeChange}
              startAddMode={startAddMode}
              onEditData={() => editData()}
              onCancelEdit={() => setEditedData(null)}
            />
          )}
        </div>
      </ThemeProvider>
    </section>
  );
}
