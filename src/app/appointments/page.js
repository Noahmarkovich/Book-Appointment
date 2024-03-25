"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGrid from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  addAppointment,
  getAppointments,
  getPatientTreatments,
  removeAppointment,
  updateAppointment,
} from "../services/service";
import { AppointmentModal } from "@/components/appointment-modal";
import { AuthContext } from "@/context/authContext";

export default function Appointments() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [error, setError] = useState();
  const theme = useContext(AuthContext);
  const { patient, setPatient } = theme;
  const [appointments, setAppointments] = useState(null);
  const [patientTreatments, setPatientTreatments] = useState(null);
  const [appointmentToEdit, setAppointmentToEdit] = useState({
    title: "",
    start: "",
    end: "",
  });

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
          appointment.patientId === patient.id &&
          appointment.title === treatment.label
      );
      if (!treatmentAppointments || treatmentAppointments.length === 0)
        return treatment;
      const isNeedDisable = treatmentAppointments?.find(
        (treatmentAppointment) =>
          new Date(treatmentAppointment.start) <
          new Date(new Date().setMonth(new Date().getMonth() + 3))
      );
      if (isNeedDisable) {
        const newTreatment = { ...treatment, ["isDisable"]: true };
        return newTreatment;
      } else return treatment;
    });
  }, [appointments, patientTreatments, patient]);

  useEffect(() => {
    if (patient) {
      const patientTreatments = getPatientTreatments(patient.id);
      setPatientTreatments(patientTreatments);
    }
  }, [patient]);

  useEffect(() => {
    if (patient) {
      const appointments = getAppointments(patient.id);
      setAppointments(appointments);
    }
  }, [patient]);

  function handleSelect(info) {
    const isValidTime = isWithinBusinessHours(info.date);
    if (!isValidTime) return;
    setAppointmentToEdit({ ...appointmentToEdit, start: info.date });
    handleOpen();
  }

  function isWithinBusinessHours(start) {
    var businessHours = [
      {
        daysOfWeek: [0, 1, 2, 4],
        startTime: "09:00",
        endTime: "18:00",
      },
      {
        daysOfWeek: [3],
        startTime: "09:00",
        endTime: "14:00",
      },
    ];

    const businessTime = businessHours.find((business) =>
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

  function onAddAppointment() {
    if (!appointmentToEdit.title) {
      setError("You must pick a treatment");
      return;
    }
    if (!appointmentToEdit.end || !appointmentToEdit.start) {
      setError("You must choose a date");
      return;
    }

    const newAppointments = addAppointment(appointmentToEdit, patient.id);
    setAppointments(newAppointments);
    handleClose();
  }

  function onUpdateAppointment() {
    let updatedAppointment = appointmentToEdit;
    delete updatedAppointment.backgroundColor;
    const filteredAppointments = updateAppointment(updatedAppointment);
    setAppointments(filteredAppointments);
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

  function deleteAppointment() {
    const answer = confirm("Sure you want to cancel the appointment?");
    if (!answer) return;
    const filteredAppointments = removeAppointment(appointmentToEdit);
    setAppointments(filteredAppointments);
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

  if (!appointments) return <div>loading</div>;
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
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGrid, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "title,prev,next",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        businessHours={[
          {
            daysOfWeek: [0, 1, 2, 4],
            startTime: "09:00",
            endTime: "18:00",
          },
          {
            daysOfWeek: [3],
            startTime: "09:00",
            endTime: "14:00",
          },
        ]}
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
      />
    </main>
  );
}
