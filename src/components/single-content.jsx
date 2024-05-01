import { typographyTheme } from "@/styles/theme/muiTheme";
import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";

export function SingleContent({ reason }) {
  return (
    <div className="content">
      <div className="icon">
        <img src={`/images/${reason.icon}.png`} />
      </div>
      <ThemeProvider theme={typographyTheme}>
        <Typography variant="h5" mt={"5px"} mb={"15px"}>
          {reason.title}
        </Typography>

        <Typography variant="paragraphLightColor">{reason.p}</Typography>
      </ThemeProvider>
    </div>
  );
}
