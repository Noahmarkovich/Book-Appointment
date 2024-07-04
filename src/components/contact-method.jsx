import { Typography } from "@mui/material";

export function ContactMethod({ method }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {method.icon}
      <Typography variant="normal">
        {method.title}: {method.content}
      </Typography>
    </div>
  );
}
