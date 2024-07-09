"use client";
import { typographyTheme } from "@/styles/theme/muiTheme";
import { ThemeProvider, Typography, useMediaQuery } from "@mui/material";

export function OurTreatmentsCmp({ data, treatments }) {
  const mobileScreenSize = useMediaQuery("(max-width:800px)");
  if (!data || !treatments) return <div>loading</div>;
  return (
    <div className="our-treatments">
      <ThemeProvider theme={typographyTheme}>
        <Typography variant={mobileScreenSize ? "h4" : "h2"}>
          {data.content.treatments.title}
        </Typography>
        <Typography
          sx={{
            maxWidth: "70%",
            lineHeight: "1.5",
            maxWidth: mobileScreenSize ? "100%" : "65%",
          }}
          variant={mobileScreenSize ? "paragraphLightColor" : "h6"}
        >
          {data.content.treatments.p}
        </Typography>
        <img src={`/images/${data.content.treatments.image}.jpg`} />
        <div className="treatments">
          {treatments?.map((treatment) => {
            return (
              <div key={treatment.id}>
                <Typography variant="h6">
                  {treatment.type ?? treatment.title}
                </Typography>
                <Typography>Price :{treatment.price} </Typography>
                <Typography>Duration :{treatment.duration} </Typography>
              </div>
            );
          })}
        </div>
      </ThemeProvider>
    </div>
  );
}
