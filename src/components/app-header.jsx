"use client";
import Link from "next/link";
import "../styles/main.scss";
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@emotion/react";
import { buttonTheme } from "@/styles/theme/muiTheme";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { getCookie } from "@/app/services/service";

const patientHeaderTitles = [
  { title: "About us", ref: "/" },
  { title: "Our treatments", ref: "/ourTreatments" },
  { title: "Schedule appointment", ref: "/appointments" },
];
const adminHeaderTitles = [
  { title: "Manage patients", ref: "/admin" },
  { title: "Manage Content", ref: "/admin/manageContent" },
  { title: "Manage appointment", ref: "/admin/appointments" },
];

export function AppHeader() {
  const router = useRouter();
  const theme = useContext(AuthContext);
  const { patient, setPatient, admin, setAdmin } = theme;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navLinksToShow = useMemo(() => {
    if (!patient && !admin) {
      return patientHeaderTitles.filter(
        (nav) => nav.title !== "Schedule appointment"
      );
    }
    if (admin) {
      return adminHeaderTitles;
    } else return patientHeaderTitles;
  }, [patient, admin]);

  useEffect(() => {
    const currentAdmin = getCookie("user");
    const currentPatient = getCookie("patient");

    if (currentAdmin) {
      setAdmin(JSON.parse(currentAdmin));
    }
    if (currentPatient) {
      setPatient(JSON.parse(currentPatient));
    }
  }, [setPatient, setAdmin]);

  function onLogout() {
    if (admin) {
      document.cookie = `user="";max-age=0`;
      setAdmin(null);
    }
    if (patient) {
      document.cookie = `patient="";max-age=0`;
      setPatient(null);
    }
    router.push("/");
    sessionStorage.clear();
    handleClose();
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
          {patient || admin ? (
            <div>
              <Avatar
                sx={{
                  bgcolor: patient ? patient.avatar.color : admin.avatar.color,
                  cursor: "pointer",
                }}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                id="basic-menu"
              >
                {patient ? patient.avatar.initials : admin.avatar.initials}
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
