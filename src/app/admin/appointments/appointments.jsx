"use client";

import { AppointmentModal } from "@/components/appointment-modal";
import { AuthContext } from "@/context/authContext";
import FullCalendar from "@fullcalendar/react";
import { useContext, useEffect, useMemo, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export function AppointmentsCmp({
  fetchedAppointments,
  fetchedPatients,
  treatments,
  data,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [error, setError] = useState();
  const theme = useContext(AuthContext);
  const { admin, setAdmin } = theme;
  const [appointments, setAppointments] = useState();
  const [patientTreatments, setPatientTreatments] = useState(null);
  const [appointmentToEdit, setAppointmentToEdit] = useState({
    title: "",
    start: "",
    end: "",
  });
  const [patients, setPatients] = useState();
  const [currentPatient, setCurrentPatient] = useState({});

  useEffect(() => {
    const patients = fetchedPatients.map((patient) => {
      let newPatient = { ...patient };
      newPatient["label"] = patient.email;
      return newPatient;
    });

    setPatients(patients);
  }, [fetchedPatients]);

  const filteredTreatments = useMemo(() => {
    return patientTreatments?.map((treatment) => {
      const treatmentAppointments = fetchedAppointments.filter(
        (appointment) =>
          appointment.patientId === currentPatient?.id &&
          appointment.title === treatment.label
      );
      if (!treatmentAppointments || treatmentAppointments.length === 0)
        return treatment;
      const isNeedDisable = treatmentAppointments?.find(
        (treatmentAppointment) =>
          new Date(treatmentAppointment.start) <
          new Date(
            new Date().setMonth(
              new Date().getMonth() + +data.content.durationBetweenTreatments
            )
          )
      );
      if (isNeedDisable) {
        const newTreatment = { ...treatment, ["isDisable"]: true };
        return newTreatment;
      } else return treatment;
    });
  }, [fetchedAppointments, patientTreatments, currentPatient, data]);

  useEffect(() => {
    if (admin?.role === "ADMIN") {
      setAppointments(fetchedAppointments);
    }
  }, [admin, fetchedAppointments]);

  useMemo(() => {
    appointments?.map(
      (appointment) =>
        (appointment["patientName"] = fetchedPatients.find(
          (patient) => patient.id === appointment.patientId
        ).fullName)
    );
  }, [fetchedPatients, appointments]);

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
    setCurrentPatient(null);
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

    const newAppointment = {
      ...appointmentToEdit,
      patientId: currentPatient.id,
    };

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
    delete updatedAppointment.patientName;
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
    const currentAppointment = appointments?.find(
      (appointment) => appointment.id === id
    );
    const currentPatient = patients.find(
      (patient) => patient.id === currentAppointment.patientId
    );
    const currentPatientTreatments = currentPatient.treatments.map(
      (patientTreatment) => {
        return treatments.find(
          (treatment) => treatment.id === patientTreatment.treatmentId
        );
      }
    );
    setPatientTreatments(currentPatientTreatments);

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

  if (!fetchedAppointments || !data) return <div>loading</div>;
  if (!admin) return <div>page not found</div>;

  return (
    <main className="appointments">
      <AppointmentModal
        open={open}
        handleClose={handleClose}
        patientTreatments={filteredTreatments}
        setPatientTreatments={setPatientTreatments}
        appointmentToEdit={appointmentToEdit}
        setAppointmentToEdit={setAppointmentToEdit}
        onSubmitAppointment={
          appointmentToEdit.id ? onUpdateAppointment : onAddAppointment
        }
        deleteAppointment={deleteAppointment}
        error={error}
        setError={setError}
        checkIfOverlap={checkIfOverlap}
        patients={patients}
        currentPatient={currentPatient}
        setCurrentPatient={setCurrentPatient}
        user={admin ? "admin" : "patient"}
        treatments={treatments}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGrid, interactionPlugin]}
        initialView="timeGridWeek"
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
        eventContent={function (arg) {
          let italicEl = document.createElement("a");
          let italicEl2 = document.createElement("a");
          italicEl.innerHTML = arg.event.extendedProps.patientName;
          italicEl2.innerHTML = arg.event.title;

          let arrayOfDomNodes = [italicEl, italicEl2];
          return { domNodes: arrayOfDomNodes };
        }}
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
