"use client";

import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { buttonTheme, typographyTheme } from "@/styles/theme/muiTheme";
import { useRouter } from "next/navigation";
import { SingleContent } from "@/components/single-content";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import { ContactMethod } from "@/components/contact-method";
const contactUs = {
  title: "Contact us",
  p1: "At Our Clinic, your beauty and comfort are our top priorities. Our skilled team of professionals is here to assist you with any questions or concerns about our laser treatments. Whether you want to schedule a consultation, inquire about our services, or seek expert advice, we're here to help. Feel free to reach out to us through any of the following methods:",
  methodsOfContact: [
    {
      title: "Call us",
      icon: <CallIcon />,
      content: "+972501234567",
    },
    {
      title: "Write",
      icon: <LocalPostOfficeIcon />,
      content: "ourclinic@gmail.com",
    },
    {
      title: "Visit",
      icon: <BusinessIcon />,
      content: "123 Herzl Street  Tel Aviv, 61000 Israel",
    },
  ],
  p2: "For urgent assistance outside of our operating hours, please leave a message, and we will get back to you as soon as possible. We look forward to helping you achieve your aesthetic goals with our state-of-the-art laser treatments.",
};

export function HomePage({ data }) {
  const router = useRouter();
  const mobileScreenSize = useMediaQuery("(max-width:800px)");

  return (
    <main>
      <ThemeProvider theme={typographyTheme}>
        <section className="home-page">
          <div className="introduction">
            <div className="text-container">
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

              <ThemeProvider theme={buttonTheme}>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent={mobileScreenSize && "center"}
                >
                  <Button
                    onClick={() => router.push("/#contactUs")}
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
          <div className="contact-us">
            <div className="text-container">
              <Typography
                id="contact-us-title"
                variant={mobileScreenSize ? "h4" : "h2"}
              >
                {contactUs.title}
              </Typography>
              <Typography variant="normal">{contactUs.p1}</Typography>
              <div id="contactUs" className="contact-methods">
                {contactUs.methodsOfContact.map((method) => {
                  return <ContactMethod key={method.title} method={method} />;
                })}
              </div>
              <Typography variant="normal">{contactUs.p2}</Typography>
            </div>
            <div className="image-container">
              <img src="/images/map.png" />
            </div>
          </div>
          <footer>
            <Typography fontSize={"12px"} variant="paragraphLightColor">
              © 2024 My Clinic. All Rights Reserved.
            </Typography>
            <Typography fontSize={"12px"} variant="paragraphLightColor">
              Designed and developed by Noah Markovich.
            </Typography>
            <Typography fontSize={"12px"} variant="paragraphLightColor">
              Privacy Policy | Terms of Service
            </Typography>
          </footer>
        </section>
      </ThemeProvider>
    </main>
  );
}
