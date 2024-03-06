"use client";

import { buttonTheme } from "@/styles/theme/muiTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getPatient } from "../services/service";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authContext";
export default function LoginPage() {
  const theme = useContext(AuthContext);
  const { patient, setPatient } = theme;
  const [error, setError] = useState(null);
  const router = useRouter();

  function submitHandle(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const patient = getPatient(credentials);
    if (typeof patient === "string") {
      setError(patient);
    } else {
      setError(null);
      setPatient(patient);
      router.push("/");
    }
  }

  return (
    <section className="login-page ">
      <div className="login-container">
        <div className="form-container">
          <ThemeProvider theme={buttonTheme}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: "8px 0" },
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
              noValidate
              autoComplete="off"
              onSubmit={submitHandle}
            >
              <Typography variant="h5">Welcome back</Typography>
              <Typography sx={{ color: "#979797b5" }}>
                Please enter your details
              </Typography>
              <TextField
                fullWidth
                required
                id="fullWidth"
                label="Email"
                type="email"
                name="email"
              />
              <TextField
                fullWidth
                required
                id="fullWidth2"
                label="Password"
                type="password"
                name="password"
              />

              <Button type="submit" variant="contained" color="black">
                Sign in
              </Button>
            </Box>
            {error && (
              <Typography color={"red"} sx={{ margin: "5px 0" }}>
                {error}
              </Typography>
            )}
            <Button
              fullWidth
              variant="text"
              color="black"
              sx={{ textTransform: "none" }}
              onClick={() => router.push("/sign-up")}
            >
              Don't have an account? sign up for free
            </Button>
          </ThemeProvider>
        </div>
        <img src="/images/laser-treatment.png" alt="laser-treatment" />
      </div>
    </section>
  );
}
