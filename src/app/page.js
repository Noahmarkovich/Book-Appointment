"use client";

import { Button, Stack, Typography } from "@mui/material";
import styles from "./page.module.css";
import { ThemeProvider } from "@emotion/react";
import { buttonTheme, typographyTheme } from "@/styles/theme/muiTheme";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getData } from "./services/admin.service";

export default function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    const currentData = getData("home-page");
    setData(currentData);
  }, []);
  const router = useRouter();

  if (!data) return <div>loading</div>;
  return (
    <main className={styles.main}>
      <section className="home-page">
        <div className="introduction">
          <div className="text-container">
            <ThemeProvider theme={typographyTheme}>
              <Typography variant="h2">{data.content.aboutUs.title}</Typography>
              {data.content.aboutUs.main.map((p) => (
                <Typography key={p.id} variant="paragraphLightColor">
                  {p.p}
                </Typography>
              ))}
            </ThemeProvider>
            <ThemeProvider theme={buttonTheme}>
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  color="mustered"
                  sx={{ textTransform: "none" }}
                >
                  Contact us
                </Button>
                <Button
                  variant="text"
                  color="black"
                  sx={{ textTransform: "none" }}
                  onClick={() => router.push("/ourTreatments")}
                >
                  Our treatments
                </Button>
              </Stack>
            </ThemeProvider>
          </div>
          <div className="image-container">
            <img src="/images/home-page-img2.png" />
          </div>
        </div>
        <div className="why-choose-us">
          <Typography id="choose-us-title" variant="h2">
            {data.content.whyChooseUs.title}
          </Typography>
          <div className="list-content">
            {data.content.whyChooseUs.listContent.map((reason, index) => {
              return (
                <div key={index} className="content">
                  <div className="icon">
                    <img src={`/images/${reason.icon}.png`} />
                  </div>
                  <ThemeProvider theme={typographyTheme}>
                    <Typography variant="h5" mt={"5px"} mb={"15px"}>
                      {reason.title}
                    </Typography>

                    <Typography variant="paragraphLightColor">
                      {reason.p}
                    </Typography>
                  </ThemeProvider>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
