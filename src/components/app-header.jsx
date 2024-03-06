"use client";
import Link from "next/link";
import "../styles/main.scss";
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@emotion/react";
import { buttonTheme } from "@/styles/theme/muiTheme";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/context/authContext";

const headerTitles = [
  { title: "About us", ref: "/" },
  { title: "Our treatments", ref: "/" },
  { title: "Schedule appointment", ref: "/appointments" },
];
export function AppHeader() {
  const router = useRouter();
  const theme = useContext(AuthContext);
  const { patient, setPatient } = theme;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navLinksToShow = useMemo(() => {
    if (!patient) {
      return headerTitles.filter((nav) => nav.title !== "Schedule appointment");
    } else return headerTitles;
  }, [patient]);

  useEffect(() => {
    const currentPatient = sessionStorage.getItem("patient");
    if (currentPatient) {
      setPatient(JSON.parse(currentPatient));
    }
  }, [setPatient]);

  function onLogout() {
    sessionStorage.clear();
    setPatient(null);
    handleClose();
    router.push("/");
  }

  return (
    <nav className="app-header">
      <div className="navigation-container">
        <div className="logo-container">
          <img className="logo" src="/images/laser-icon.png" alt="logo" />
          <h2>Our clinic</h2>
        </div>
        <div className="links-container">
          {navLinksToShow.map((title, index) => (
            <Link href={title.ref} key={index}>
              {title.title}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <ThemeProvider theme={buttonTheme}>
          {patient ? (
            <div>
              <Avatar
                sx={{ bgcolor: patient.avatar.color, cursor: "pointer" }}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                id="basic-menu"
              >
                {patient.avatar.initials}
              </Avatar>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              variant="contained"
              color="black"
            >
              Log in
            </Button>
          )}
        </ThemeProvider>
      </div>
    </nav>
  );
}
