"use client";
import { getData } from "@/app/services/admin.service";
import { buttonTheme } from "@/styles/theme/muiTheme";
import { Button, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

export default function ManageContent() {
  const [data, setData] = useState();
  const [showedData, setShowedData] = useState();

  useEffect(() => {
    const currentData = getData();
    setData(currentData);
  }, []);

  if (showedData) {
    Object.entries(showedData?.content).map((key) => console.log(key));
  }

  return (
    <section>
      <div className="data-controllers">
        <ThemeProvider theme={buttonTheme}>
          {data?.map((content) => {
            return (
              <Button
                variant="text"
                onClick={() => setShowedData(content)}
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
          {/* <form>
            {Object.entries(showedData?.content).map((key) => (
              <div key={key[0]}>{key[1].title}</div>
            ))}

          </form> */}
        </div>
      )}
    </section>
  );
}
