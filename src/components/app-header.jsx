"use client";
import Link from "next/link";
import "../styles/main.scss";
import {
  Avatar,
  Box,
  Button,
  Fade,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@emotion/react";
import { buttonTheme } from "@/styles/theme/muiTheme";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/context/authContext";
import useScreenSize from "@/hooks/use-screen-size";
import MenuIcon from "@mui/icons-material/Menu";
import { cookieCheck } from "@/app/utils/cookies";

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
  const screenSize = useScreenSize();
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
    getTheCookie();
  }, []);

  async function getTheCookie() {
    const patientCookie = await cookieCheck("patient");
    const userCookie = await cookieCheck("user");
    if (patientCookie) {
      setPatient(JSON.parse(patientCookie));
    }
    if (userCookie) {
      setPatient(JSON.parse(userCookie));
    }
  }

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

  function onNavigate(navigateTo) {
    router.push(navigateTo);
    handleClose();
  }

  return (
    <nav className="app-header">
      <div className="navigation-container">
        <div className="logo-container" onClick={() => router.push("/")}>
          <img className="logo" src="/images/laser-icon.png" alt="logo" />
          <h2>Our clinic</h2>
        </div>
        {screenSize.width > 800 ? (
          <div className="links-container">
            {navLinksToShow.map((title, index) => (
              <Link href={title.ref} key={index}>
                {title.title}
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <ThemeProvider theme={buttonTheme}>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ color: "black" }}
              >
                <MenuIcon color="black" />
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                {navLinksToShow.map((title, index) => (
                  <MenuItem onClick={() => onNavigate(title.ref)} key={index}>
                    {title.title}
                  </MenuItem>
                ))}

                {patient || admin ? (
                  <Box
                    sx={{
                      display: "flex",
                      padding: "6px 16px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: patient
                          ? patient.avatar.color
                          : admin.avatar.color,
                        cursor: "pointer",
                      }}
                    >
                      {patient
                        ? patient.avatar.initials
                        : admin.avatar.initials}
                    </Avatar>
                    <Button
                      onClick={onLogout}
                      variant="contained"
                      color="black"
                    >
                      Log out
                    </Button>
                  </Box>
                ) : (
                  <Button
                    sx={{ margin: "6px 16px", width: "-webkit-fill-available" }}
                    onClick={() => router.push("/login")}
                    variant="contained"
                    color="black"
                  >
                    Log in
                  </Button>
                )}
              </Menu>
            </ThemeProvider>
          </div>
        )}
      </div>
      {screenSize.width > 800 && (
        <div>
          <ThemeProvider theme={buttonTheme}>
            {patient || admin ? (
              <div>
                <Avatar
                  sx={{
                    bgcolor: patient
                      ? patient.avatar.color
                      : admin.avatar.color,
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
      )}
    </nav>
  );
}
