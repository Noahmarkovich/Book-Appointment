"use client";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CleanHandsIcon from "@mui/icons-material/CleanHands";
import AdsClickIcon from "@mui/icons-material/AdsClick";
const aboutUs = {
  title: "Welcome to our clinic - Laser Hair Removal Treatment Center!",
  main: [
    {
      id: "p1",
      p: "Our clinic is a small and intimate establishment specializing in laser hair removal treatments. We believe in a personal and warm approach to every client, and we are committed to providing you with the best service in a pleasant and personal atmosphere.",
    },
    {
      id: "p2",
      p: "We invite you to join us and enjoy our professional and personal service, for a worry-free experience with impressive results. ",
    },
  ],
};

const whyChooseUs = {
  title: "Why choose us ?",
  listContent: [
    {
      title: "Holistic approach by experts",
      icon: <Diversity1Icon fontSize="large" sx={{ color: "#ffc65c" }} />,
      content:
        "Our clinic takes a holistic approach to laser hair removal, where our expert team considers individual needs and concerns, ensuring a comprehensive and personalized treatment experience.",
    },
    {
      title: "Customized treatment plan",
      icon: <EventAvailableIcon fontSize="large" sx={{ color: "#ffc65c" }} />,
      content:
        "Each client receives a customized treatment plan tailored to their unique hair type, skin tone, and desired outcome, guaranteeing optimal results and satisfaction.",
    },
    {
      title: "Keeping clean and sterilized",
      icon: <CleanHandsIcon fontSize="large" sx={{ color: "#ffc65c" }} />,
      content:
        "We prioritize cleanliness and sterilization in every aspect of our clinic, maintaining rigorous standards to ensure a safe and hygienic environment for all our clients.",
    },
    {
      title: "Availability and easy access",
      icon: <AdsClickIcon fontSize="large" sx={{ color: "#ffc65c" }} />,
      content:
        "With convenient online scheduling, we offer flexible appointment availability for our clients, ensuring easy access to our services at their preferred times.",
    },
  ],
};
import { Button, Stack, Typography } from "@mui/material";
import styles from "./page.module.css";
import { ThemeProvider } from "@emotion/react";
import { buttonTheme, typographyTheme } from "@/styles/theme/muiTheme";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <section className="home-page">
        <div className="introduction">
          <div className="text-container">
            <ThemeProvider theme={typographyTheme}>
              <Typography variant="h2">{aboutUs.title}</Typography>
              {aboutUs.main.map((p) => (
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
            {whyChooseUs.title}
          </Typography>
          <div className="list-content">
            {whyChooseUs.listContent.map((reason, index) => {
              return (
                <div key={index} className="content">
                  <div className="icon">{reason.icon}</div>
                  <ThemeProvider theme={typographyTheme}>
                    <Typography variant="h5" mt={"5px"} mb={"15px"}>
                      {reason.title}
                    </Typography>
                    <Typography variant="paragraphLightColor">
                      {reason.content}
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
