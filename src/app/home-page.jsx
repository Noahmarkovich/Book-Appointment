"use client";

import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { buttonTheme, typographyTheme } from "@/styles/theme/muiTheme";
import { useRouter } from "next/navigation";
import { SingleContent } from "@/components/single-content";

export function HomePage({ data }) {
  const router = useRouter();
  const mobileScreenSize = useMediaQuery("(max-width:800px)");

  return (
    <main>
      <section className="home-page">
        <div className="introduction">
          <div className="text-container">
            <ThemeProvider theme={typographyTheme}>
              <Typography
                variant={mobileScreenSize ? "h4" : "h2"}
                textAlign={mobileScreenSize ? "center" : "left"}
              >
                {data?.content.aboutUs.title}
              </Typography>
              {data?.content.aboutUs.main.map((p) => (
                <Typography
                  key={p.id}
                  variant="paragraphLightColor"
                  textAlign={mobileScreenSize ? "center" : "left"}
                >
                  {p.p}
                </Typography>
              ))}
            </ThemeProvider>
            <ThemeProvider theme={buttonTheme}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent={mobileScreenSize && "center"}
              >
                <Button
                  variant="contained"
                  color="mustered"
                  sx={{
                    textTransform: "none",
                  }}
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
          <Typography
            id="choose-us-title"
            variant={mobileScreenSize ? "h4" : "h2"}
          >
            {data?.content.whyChooseUs.title}
          </Typography>
          <div className="list-content">
            {data?.content.whyChooseUs.listContent.map((reason) => {
              return <SingleContent key={reason.id} reason={reason} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
