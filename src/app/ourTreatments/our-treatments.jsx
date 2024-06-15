"use client";
import useScreenSize from "@/hooks/use-screen-size";
import { typographyTheme } from "@/styles/theme/muiTheme";
import { ThemeProvider, Typography } from "@mui/material";

export function OurTreatmentsCmp({ data }) {
  const screenSize = useScreenSize();
  if (!data) return <div>loading</div>;
  return (
    <div className="our-treatments">
      <ThemeProvider theme={typographyTheme}>
        <Typography variant={screenSize.width > 640 ? "h2" : "h4"}>
          {data.content.treatments.title}
        </Typography>
        <Typography
          sx={{
            maxWidth: "70%",
            lineHeight: "1.5",
            maxWidth: screenSize.width > 1000 ? "65%" : "100%",
          }}
          variant={screenSize.width > 640 ? "h6" : "paragraphLightColor"}
        >
          {data.content.treatments.p}
        </Typography>
        <img src={`/images/${data.content.treatments.image}.jpg`} />
        <div className="treatments">
          {data.content.treatments.treatments.map((treatment) => {
            return (
              <div key={treatment.id}>
                <Typography variant="h6">
                  {treatment.type ?? treatment.title}
                </Typography>
                <Typography>{treatment.price} :מחיר</Typography>
                <Typography>{treatment.duration} :אורך טיפול</Typography>
              </div>
            );
          })}
        </div>
      </ThemeProvider>
    </div>
  );
}
