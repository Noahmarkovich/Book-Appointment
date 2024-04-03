"use client";
import {
  AppointmentsDictionary,
  HomePageDictionary,
  OurTreatmentsDictionary,
  getData,
} from "@/app/services/admin.service";
import { buttonTheme } from "@/styles/theme/muiTheme";
import { Button, TextField, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ManageContent() {
  const [data, setData] = useState();
  const [showedData, setShowedData] = useState();

  useEffect(() => {
    const currentData = getData();
    setData(currentData);
  }, []);

  function getSectionData(contentId) {
    if (contentId === "home-page") {
      setShowedData(HomePageDictionary);
    }
    if (contentId === "our-treatments") {
      setShowedData(OurTreatmentsDictionary);
    }
    if (contentId === "appointments") {
      setShowedData(AppointmentsDictionary);
    }
  }

  // if (showedData) {
  //   Object.entries(showedData?.content).map((key) => console.log(key));
  // }
  console.log(showedData);
  return (
    <section className="edit-content">
      <div className="data-controllers">
        <ThemeProvider theme={buttonTheme}>
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
        </ThemeProvider>
      </div>
      {showedData && (
        <div>
          <form className="edit-data-form">
            {showedData.map((inputConfig) => {
              return (
                <div key={inputConfig.id} className="inputs">
                  <Typography>{inputConfig.label}</Typography>
                  {typeof inputConfig.value === "string" ||
                  typeof inputConfig.value === "number" ? (
                    <TextField
                      value={inputConfig.value}
                      name="inputConfig.id"
                      multiline
                      rows={4}
                    />
                  ) : (
                    inputConfig.value.map((input) => {
                      return (
                        <div key={input.id} className="input">
                          {input.title && (
                            <TextField
                              value={input.title}
                              label="Title"
                              multiline
                              rows={4}
                            />
                          )}
                          {input.p && (
                            <TextField
                              value={input.p}
                              label="Paragraph"
                              multiline
                              rows={4}
                            />
                          )}
                          {input.duration && (
                            <TextField
                              value={input.duration}
                              label="Duration"
                              type="number"
                            />
                          )}
                          {input.price && (
                            <TextField
                              value={input.price}
                              label="Price"
                              type="number"
                            />
                          )}
                          {/* {input.icon && (
                            <input value={input.icon} type="image" />
                          )} */}
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })}
          </form>
        </div>
      )}
    </section>
  );
}
