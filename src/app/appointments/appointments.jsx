"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppointmentModal } from "@/components/appointment-modal";
import { AuthContext } from "@/context/authContext";
import { useMediaQuery } from "@mui/material";

export function AppointmentsClient({
  appointmentsFromServer,
  patientTreatments,
  data,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [error, setError] = useState();
  const theme = useContext(AuthContext);
  const { patient, setPatient } = theme;
  const [appointments, setAppointments] = useState(appointmentsFromServer);
  const [appointmentToEdit, setAppointmentToEdit] = useState({
    title: "",
    start: "",
    end: "",
  });
  const matches = useMediaQuery("(max-width:800px)");

  useMemo(() => {
    if (patient) {
      appointments?.map((appointment) => {
        if (appointment.patientId === patient.id) {
          let newAppointment = appointment;
          newAppointment["backgroundColor"] = "rgb(253 226 244)";
          return newAppointment;
        } else return appointment;
      });
    }
  }, [appointments, patient]);

  const filteredTreatments = useMemo(() => {
    return patientTreatments?.map((treatment) => {
      const treatmentAppointments = appointments.filter(
        (appointment) =>
          appointment.patientId === patient?.id &&
          appointment.title === treatment.treatment.title
      );
      if (!treatmentAppointments || treatmentAppointments.length === 0)
        return treatment.treatment;
      const isNeedDisable = treatmentAppointments?.find(
        (treatmentAppointment) =>
          new Date(treatmentAppointment.start) <
          new Date(
            new Date().setMonth(
              new Date().getMonth() + +data?.content.durationBetweenTreatments
            )
          )
      );
      if (isNeedDisable) {
        const newTreatment = {
          ...treatment.treatment,
          ["isDisable"]: true,
          label: treatment.treatment.title,
        };
        return newTreatment;
      } else
        return { ...treatment.treatment, label: treatment.treatment.title };
    });
  }, [appointments, patientTreatments, patient, data]);

  function handleSelect(info) {
    const isValidTime = isWithinBusinessHours(info.date);
    if (!isValidTime) return;
    setAppointmentToEdit({ ...appointmentToEdit, start: info.date });
    handleOpen();
  }

  function isWithinBusinessHours(start) {
    const businessTime = data.content.businessHours.find((business) =>
      business.daysOfWeek.includes(start.getDay())
    );
    if (!businessTime) {
      return businessTime;
    }

    const isValidStartTime =
      start
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(/AM|PM/, "") >= businessTime.startTime &&
      start
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(/AM|PM/, "") < businessTime.endTime;

    return isValidStartTime;
  }

  function handleClose() {
    setOpen(false);
    setAppointmentToEdit({
      title: "Select treatment",
      start: "",
      end: "",
    });
    setError(null);
  }

  async function onAddAppointment() {
    if (!appointmentToEdit.title) {
      setError("You must pick a treatment");
      return;
    }
    if (!appointmentToEdit.end || !appointmentToEdit.start) {
      setError("You must choose a date");
      return;
    }
    const newAppointment = { ...appointmentToEdit, patientId: patient.id };

    const res = await fetch("/api/appointments", {
      method: "POST",
      body: JSON.stringify(newAppointment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newAppointments = await res.json();
    setAppointments(newAppointments);

    handleClose();
  }

  async function onUpdateAppointment() {
    let updatedAppointment = appointmentToEdit;

    delete updatedAppointment.backgroundColor;
    const res = await fetch("/api/appointments", {
      method: "PUT",
      body: JSON.stringify(updatedAppointment),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedAppointments = await res.json();
    setAppointments(updatedAppointments);
    handleClose();
  }
  function handleEventClick(clickedAppointment) {
    const { id } = clickedAppointment.event;
    const currentAppointment = appointments.find(
      (appointment) => appointment.id === id
    );
    if (currentAppointment.patientId !== patient.id) return;
    setAppointmentToEdit(currentAppointment);
    handleOpen();
  }

  async function deleteAppointment() {
    const answer = confirm("Sure you want to cancel the appointment?");
    if (!answer) return;
    const res = await fetch("/api/appointments", {
      method: "DELETE",
      body: JSON.stringify(appointmentToEdit),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedAppointments = await res.json();
    setAppointments(updatedAppointments);

    handleClose();
  }

  function checkIfOverlap(endDate) {
    const appointmentOverlap = appointments.find(
      (appointment) =>
        new Date(appointment.end).getTime() === endDate.getTime() ||
        new Date(appointment.start).getTime() === endDate.getTime() ||
        (new Date(appointment.start).getTime() < endDate.getTime() &&
          new Date(appointment.end).getTime() > endDate.getTime())
    );

    return appointmentOverlap;
  }

  if (!appointments || !data) return <div>loading</div>;
  if (!patient) return <div>page not found</div>;
  return (
    <main className="appointments">
      <AppointmentModal
        open={open}
        handleClose={handleClose}
        patientTreatments={filteredTreatments}
        appointmentToEdit={appointmentToEdit}
        setAppointmentToEdit={setAppointmentToEdit}
        onSubmitAppointment={
          appointmentToEdit.id ? onUpdateAppointment : onAddAppointment
        }
        deleteAppointment={deleteAppointment}
        error={error}
        setError={setError}
        checkIfOverlap={checkIfOverlap}
        user={patient ? "patient" : "admin"}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGrid, interactionPlugin]}
        initialView={matches ? "timeGridDay" : "timeGridWeek"}
        headerToolbar={{
          left: "title,prev,next",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        businessHours={data.content.businessHours}
        slotMinTime="9:00"
        slotMaxTime="18:00"
        allDaySlot={false}
        contentHeight="auto"
        dateClick={handleSelect}
        selectConstraint="businessHours"
        eventConstraint="businessHours"
        selectable={true}
        events={appointments}
        eventClick={handleEventClick}
        eventTextColor={"black"}
        eventBackgroundColor="rgb(232 249 255)"
        eventBorderColor="#8080804a"
        eventClassNames={function (arg) {
          if (
            Math.floor(
              (new Date(arg.event.end) - new Date(arg.event.start)) /
                (1000 * 60)
            ) < 20
          ) {
            return "small-cell";
          }
        }}
      />
    </main>
  );
}
