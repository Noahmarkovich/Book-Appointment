setPatients();
setPatientsTreatments();
setAppointments();

function setPatients() {
  let patients = loadFromStorage("patientDB");
  if (!patients) {
    patients = [
      {
        id: "u1",
        fullName: "Noah Markovich",
        email: "noahm93@gmail.com",
        phone: "0501234567",
        password: "noah123",
        avatar: {
          initials: "NM",
          color: "rgb(103, 58, 183)",
        },
      },
      {
        id: "u2",
        fullName: "Dina Dan",
        email: "dinad@gmail.com",
        phone: "0501234568",
        password: "dina123",
        avatar: {
          initials: "DD",
          color: "rgb(255, 87, 34)",
        },
      },
      {
        id: "u3",
        fullName: "Dana Banana",
        email: "danab@gmail.com",
        phone: "0501234569",
        password: "dana123",
        avatar: {
          initials: "DB",
          color: "blue",
        },
      },
    ];
    saveToStorage("patientDB", patients);
  }
}
function setPatientsTreatments() {
  let patientsTreatments = loadFromStorage("patientsTreatmentsDB");
  if (!patientsTreatments) {
    patientsTreatments = [
      {
        treatmentId: "t1",
        patientId: "u1",
        assignedBy: "admin1",
        label: "בית שחי",
        duration: 30,
        price: 200,
      },
      {
        treatmentId: "t2",
        patientId: "u1",
        assignedBy: "admin1",
        label: "רגליים",
        duration: 60,
        price: 400,
      },
      {
        treatmentId: "t3",
        patientId: "u1",
        assignedBy: "admin1",
        label: "ידיים",
        duration: 45,
        price: 200,
      },
      {
        assignedBy: "admin1",
        duration: 15,
        label: "פגישת ייעוץ",
        patientId: "3VNXrp",
        price: 0,
        treatmentId: "t7",
      },
    ];
    saveToStorage("patientsTreatmentsDB", patientsTreatments);
  }
}

function setAppointments() {
  let appointments = loadFromStorage("appointmentsDB");
  if (!appointments) {
    appointments = [
      {
        id: "a1",
        patientId: "u1",
        title: "רגליים",
        start: "2024-03-05" + "T16:00:00",
        end: "2024-03-05" + "T17:00:00",
      },
      {
        id: "a3",
        title: "רגליים",
        patientId: "u2",
        start: "2024-03-04" + "T10:00:00",
        end: "2024-03-04" + "T11:00:00",
      },
      {
        id: "a4",
        title: "בית שחי",
        patientId: "u1",
        start: "2024-03-06" + "T10:00:00",
        end: "2024-03-06" + "T11:00:00",
      },
    ];
    saveToStorage("appointmentsDB", appointments);
  }
}

export function getAppointments(patientId) {
  let appointments = loadFromStorage("appointmentsDB");
  return appointments.map((appointment) => {
    if (appointment.patientId === patientId) {
      return appointment;
    } else {
      let alteredAppointment = { ...appointment };
      alteredAppointment.title = "";
      return alteredAppointment;
    }
  });
}

export function getTreatments() {
  return [
    {
      id: "t1",
      type: "בית שחי",
      duration: 30,
      price: 200,
    },
    {
      id: "t2",
      type: "רגליים",
      duration: 60,
      price: 400,
    },
    {
      id: "t3",
      type: "ידיים",
      duration: 45,
      price: 200,
    },
    {
      id: "t4",
      type: "שפם",
      duration: 30,
      price: 150,
    },
    {
      id: "t5",
      type: "מפשעות",
      duration: 30,
      price: 200,
    },
    {
      id: "t6",
      type: "בטן",
      duration: 30,
      price: 150,
    },
    {
      id: "t7",
      type: "פגישת ייעוץ",
      duration: 15,
      price: 0,
    },
  ];
}
export function getPatientTreatments(patientId) {
  const patientsTreatments = loadFromStorage("patientsTreatmentsDB");
  const patientTreatments = patientsTreatments.filter(
    (treatment) => treatment.patientId === patientId
  );
  return patientTreatments;
}

export function addPatient(credentials) {
  let patients = loadFromStorage("patientDB");
  let patientsTreatments = loadFromStorage("patientsTreatmentsDB");
  const emailExist = patients.find(
    (patient) => patient.email === credentials.email
  );
  if (emailExist) return "User with this email already exists";
  const avatar = makeAnAvatar(credentials.fullName);
  const id = makeId();
  const patient = { ...credentials, avatar, id };
  patients.push(patient);
  const { email, fullName, phone } = patient;
  const patientToSave = { email, fullName, id, phone, avatar };
  sessionStorage.setItem("patient", JSON.stringify(patientToSave));
  patientsTreatments.push({
    treatmentId: "t7",
    patientId: id,
    assignedBy: "admin1",
    label: "פגישת ייעוץ",
    duration: 15,
    price: 0,
  });
  saveToStorage("patientDB", patients);
  saveToStorage("patientsTreatmentsDB", patientsTreatments);
  return patientToSave;
}

export function addAppointment(appointmentDetails, patientId) {
  let appointments = loadFromStorage("appointmentsDB");
  const id = makeId();
  const newAppointment = {
    ...appointmentDetails,
    id,
    patientId,
  };
  appointments.push(newAppointment);
  saveToStorage("appointmentsDB", appointments);
  return appointments;
}

export function removeAppointment(appointmentId) {
  let appointments = loadFromStorage("appointmentsDB");
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.id !== appointmentId
  );
  saveToStorage("appointmentsDB", filteredAppointments);
  return filteredAppointments;
}

export function updateAppointment(updatedAppointment) {
  let appointments = loadFromStorage("appointmentsDB");
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.id !== updatedAppointment.id
  );
  filteredAppointments.push(updatedAppointment);
  saveToStorage("appointmentsDB", filteredAppointments);
  return filteredAppointments;
}

export function getPatient(credentials) {
  const patients = loadFromStorage("patientDB");
  const patient = patients.find(
    (patient) => patient.email === credentials.email
  );
  if (!patient) return "Wrong email or password";
  if (patient.password === credentials.password) {
    const { email, fullName, id, phone, avatar } = patient;
    const patientToSave = { email, fullName, id, phone, avatar };
    sessionStorage.setItem("patient", JSON.stringify(patientToSave));
    return patientToSave;
  } else return "Wrong email or password";
}

//util functions
export function makeId(length = 6) {
  let txt = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function randomColor() {
  const x = Math.floor(Math.random() * 256);
  const y = 100 + Math.floor(Math.random() * 256);
  const z = 50 + Math.floor(Math.random() * 256);

  return "rgb(" + x + "," + y + "," + z + ")";
}

function makeAnAvatar(fullName) {
  const splitInitials = fullName.split(" ");
  let initials;
  if (splitInitials.length > 1) {
    initials = splitInitials[0][0] + splitInitials[1][0];
  } else {
    initials = splitInitials[0][0];
  }
  const color = randomColor();

  return { initials, color };
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : undefined;
}
