"use client";
import { AuthContext } from "@/context/authContext";
import { buttonTheme } from "@/styles/theme/muiTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Login() {
  const [error, setError] = useState(null);
  const theme = useContext(AuthContext);
  const { admin, setAdmin } = theme;
  const router = useRouter();

  async function submitHandle(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const res = await fetch("/api/auth/adminLogin", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 401) {
        setError("Wrong email or password");
      } else {
        setError(null);
        const user = await res.json();
        setAdmin(user);
        router.push("/admin");
      }
    } catch (err) {
      console.log(err);
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
              <Typography variant="h5">Admin login</Typography>
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
          </ThemeProvider>
        </div>
        <img src="/images/laser-treatment.png" alt="laser-treatment" />
      </div>
    </section>
  );
}
