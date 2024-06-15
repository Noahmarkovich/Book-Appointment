"use client";
import { buttonTheme } from "@/styles/theme/muiTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addPatient } from "../services/service";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [error, setError] = useState(null);
  const theme = useContext(AuthContext);
  const { patient, setPatient } = theme;
  const router = useRouter();
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  const nameRegex = /^[A-Za-z ]+$/;
  const phoneNumberRegex =
    /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;
  const schema = yup
    .object({
      fullName: yup
        .string()
        .matches(nameRegex, "Only English letters")
        .required(),
      email: yup.string().email("must be a valid email").required(),
      password: yup
        .string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .matches(/(?=.*[A-Z])/, "Password must consist of one Capital letter.")
        .matches(/(?=.*\d)/, "Password must consist of one digit.")
        .required("No password provided."),

      phoneNumber: yup
        .string()
        .matches(phoneNumberRegex, "Must be a valid phone number")
        .required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 400) {
        setError("User already exists");
      } else {
        setError(null);
        const patient = await res.json();
        setPatient(patient);
        router.push("/");
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
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography variant="h5">Welcome</Typography>
              <Typography sx={{ color: "#979797b5" }}>
                Please enter your details
              </Typography>
              <TextField
                fullWidth
                required
                label="Full name"
                name="fullName"
                {...register("fullName", { pattern: nameRegex })}
              />
              {errors.fullName && (
                <Typography color={"red"} fontSize={"12px"}>
                  {errors.fullName?.message}
                </Typography>
              )}
              <TextField
                fullWidth
                required
                label="Email"
                type="email"
                name="email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              {errors.email && (
                <Typography color={"red"} fontSize={"12px"}>
                  {errors.email?.message}
                </Typography>
              )}

              <TextField
                fullWidth
                required
                label="Password"
                type="password"
                name="password"
                {...register("password", { pattern: passwordRegex })}
              />
              {errors.password && (
                <Typography color={"red"} fontSize={"12px"}>
                  {errors.password?.message}
                </Typography>
              )}
              <TextField
                required
                fullWidth
                label="Phone number"
                name="phoneNumber"
                {...register("phoneNumber", { pattern: phoneNumberRegex })}
              />
              {errors.phoneNumber && (
                <Typography color={"red"} fontSize={"12px"}>
                  {errors.phoneNumber?.message}
                </Typography>
              )}
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
            >
              Already have an account? sign in!
            </Button>
          </ThemeProvider>
        </div>
        <img src="/images/laser-treatment.png" alt="laser-treatment" />
      </div>
    </section>
  );
}
