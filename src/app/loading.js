import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "92vh",
      }}
    >
      <CircularProgress
        sx={{
          color: "#000000a8",
        }}
        size={"80px"}
      />
    </Box>
  );
}
