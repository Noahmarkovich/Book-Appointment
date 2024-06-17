"use client";

import { Button, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { buttonTheme, typographyTheme } from "@/styles/theme/muiTheme";
import { useRouter } from "next/navigation";
import { SingleContent } from "@/components/single-content";
import useScreenSize from "@/hooks/use-screen-size";

export function HomePage({ data }) {
  const router = useRouter();
  const screenSize = useScreenSize();

  return (
    <main>
      <section className="home-page">
        <div className="introduction">
          <div className="text-container">
            <ThemeProvider theme={typographyTheme}>
              <Typography
                variant={screenSize.width > 800 ? "h2" : "h4"}
                textAlign={screenSize.width > 640 ? "left" : "center"}
              >
                {data?.content.aboutUs.title}
              </Typography>
              {data?.content.aboutUs.main.map((p) => (
                <Typography
                  key={p.id}
                  variant="paragraphLightColor"
                  textAlign={screenSize.width > 640 ? "left" : "center"}
                >
                  {p.p}
                </Typography>
              ))}
            </ThemeProvider>
            <ThemeProvider theme={buttonTheme}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent={screenSize.width <= 640 && "center"}
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
            variant={screenSize.width > 800 ? "h2" : "h4"}
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
