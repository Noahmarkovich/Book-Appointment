import { createTheme } from "@mui/material";

export const buttonTheme = createTheme({
  palette: {
    black: {
      main: "#363a3f",
      light: "#363a3fd6",
      dark: "black",
      contrastText: "white",
    },
    mustered: {
      main: "#ffc65c",
      light: "hsl(39deg 100% 68% / 71%)",
      dark: "hsl(39deg 87.29% 47.22%)",
      contrastText: "black",
    },
  },
});

export const typographyTheme = createTheme({
  typography: {
    paragraphLightColor: {
      color: "#979797de",
      fontSize: "1rem",
    },
  },
});
