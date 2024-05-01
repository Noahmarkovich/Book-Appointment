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
        phoneNumber: "0501234567",
        password: "noah123",
        avatar: {
          initials: "NM",
          color: "rgb(103, 58, 183)",
        },
        treatments: [
          {
            treatmentId: "t1",
            assignedBy: "admin1",
            label: "בית שחי",
            duration: 30,
            price: 200,
          },
          {
            treatmentId: "t2",
            assignedBy: "admin1",
            label: "רגליים",
            duration: 60,
            price: 400,
          },
          {
            treatmentId: "t3",
            assignedBy: "admin1",
            label: "ידיים",
            duration: 45,
            price: 200,
          },
        ],
        appointments: [
          {
            id: "a1",
            title: "רגליים",
            start: "2024-03-05" + "T16:00:00",
            end: "2024-03-05" + "T17:00:00",
          },
          {
            id: "a4",
            title: "בית שחי",
            start: "2024-03-06" + "T10:00:00",
            end: "2024-03-06" + "T11:00:00",
          },
        ],
      },
      {
        id: "u2",
        fullName: "Dina Dan",
        email: "dinad@gmail.com",
        phoneNumber: "0501234568",
        password: "dina123",
        avatar: {
          initials: "DD",
          color: "rgb(255, 87, 34)",
        },
        treatments: [
          {
            treatmentId: "t3",
            assignedBy: "admin1",
            label: "ידיים",
            duration: 45,
            price: 200,
          },
        ],
        appointments: [
          {
            id: "a3",
            title: "רגליים",
            start: "2024-03-04" + "T10:00:00",
            end: "2024-03-04" + "T11:00:00",
          },
        ],
      },
      {
        id: "u3",
        fullName: "Dana Banana",
        email: "danab@gmail.com",
        phoneNumber: "0501234569",
        password: "dana123",
        avatar: {
          initials: "DB",
          color: "blue",
        },
        treatments: [
          {
            assignedBy: "admin1",
            duration: 15,
            label: "פגישת ייעוץ",
            price: 0,
            treatmentId: "t7",
          },
        ],
      },
    ];
    saveToStorage("patientDB", patients);
  }
}

function setPatientsTable() {
  let patients = loadFromStorage("patientDB");
  if (!patients) {
    patients = [
      {
        id: "u1",
        fullName: "Noah Markovich",
        email: "noahm93@gmail.com",
        phoneNumber: "0501234567",
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
        phoneNumber: "0501234568",
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
        phoneNumber: "0501234569",
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
        treatmentId: "t3",
        patientId: "u2",
        assignedBy: "admin1",
        label: "ידיים",
        duration: 45,
        price: 200,
      },
      {
        treatmentId: "t3",
        patientId: "u3",
        assignedBy: "admin1",
        label: "ידיים",
        duration: 45,
        price: 200,
      },
      {
        assignedBy: "admin1",
        duration: 15,
        label: "פגישת ייעוץ",
        patientId: "P8EamK",
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

export function getPatients(searchInput) {
  let patients = loadFromStorage("patientDB");
  if (searchInput) {
    const searchTerm = searchInput.toLowerCase();
    return patients.filter((patient) => {
      const fullNameMatch = patient.fullName.toLowerCase().includes(searchTerm);
      const emailMatch = patient.email.toLowerCase().includes(searchTerm);
      if (fullNameMatch || emailMatch) {
        delete patient.password;
        return patient;
      }
    });
  }
  return patients.map((patient) => {
    delete patient.password;
    return patient;
  });
}

export function getAppointments(patientId) {
  let appointments = loadFromStorage("appointmentsDB");
  if (patientId) {
    return appointments.map((appointment) => {
      if (appointment.patientId === patientId) {
        return appointment;
      } else {
        let alteredAppointment = { ...appointment };
        alteredAppointment.title = "";
        return alteredAppointment;
      }
    });
  } else return appointments;
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
  const patient = getPatientByIdLocal(patientId);
  return patient.treatments;
}

export function removePatient(patientId) {
  const patients = loadFromStorage("patientDB");
  const updatedPatients = patients.filter(
    (patient) => patient.id !== patientId
  );
  saveToStorage("patientDB", updatedPatients);
  return updatedPatients;
}

export function getPatientById(patientId) {
  const patients = loadFromStorage("patientDB");
  let patient = patients.find((patient) => patient.id === patientId);
  delete patient.password;
  return patient;
}

function getPatientByIdLocal(patientId) {
  const patients = loadFromStorage("patientDB");
  let patient = patients.find((patient) => patient.id === patientId);
  return patient;
}
function updatePatient(updatedPatient) {
  let patients = loadFromStorage("patientDB");
  const patientIndex = patients.findIndex(
    (patient) => patient.id === updatedPatient.id
  );
  patients[patientIndex] = updatedPatient;
  saveToStorage("patientDB", patients);
}
export function updatePatientTreatments(patientId, treatments) {
  let patients = loadFromStorage("patientDB");
  // let patient = getPatientById(patientId);

  const updatedTreatments = treatments.map((treatment) => {
    if (!treatment.assignedBy) {
      const { duration, id, price, type } = treatment;
      const newTreatment = {
        treatmentId: id,
        duration,
        price,
        label: type,
        assignedBy: "admin1",
      };
      return newTreatment;
    } else return treatment;
  });

  const patientIndex = patients.findIndex(
    (patient) => patient.id === patientId
  );
  patients[patientIndex].treatments = updatedTreatments;
  saveToStorage("patientDB", patients);
  return patients;
}
export function getPatientsTreatments() {
  const patientsTreatments = loadFromStorage("patientsTreatmentsDB");

  return patientsTreatments;
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
  const treatment = {
    treatmentId: "t7",
    patientId: id,
    assignedBy: "admin1",
    label: "פגישת ייעוץ",
    duration: 15,
    price: 0,
  };
  const patient = { ...credentials, avatar, id, treatments: [treatment] };
  patients.push(patient);
  const { email, fullName, phone, treatments } = patient;

  const patientToSave = {
    email,
    fullName,
    id,
    phoneNumber: phone,
    avatar,
    treatments,
  };
  sessionStorage.setItem("patient", JSON.stringify(patientToSave));
  patientsTreatments.push(treatment);
  saveToStorage("patientDB", patients);
  saveToStorage("patientsTreatmentsDB", patientsTreatments);
  return { email, fullName, id, phoneNumber: phone, avatar };
}

export function addAppointment(appointmentDetails, patientId) {
  let appointments = loadFromStorage("appointmentsDB");
  let patient = getPatientByIdLocal(patientId);
  const id = makeId();
  const newAppointment = {
    ...appointmentDetails,
    id,
    patientId,
  };
  appointments.push(newAppointment);
  if (patient.appointments) {
    patient.appointments.push(newAppointment);
  } else patient["appointments"] = [newAppointment];

  updatePatient(patient);
  saveToStorage("appointmentsDB", appointments);
  return appointments;
}

export function removeAppointment(appointmentToRemove) {
  let appointments = loadFromStorage("appointmentsDB");
  let patient = getPatientByIdLocal(appointmentToRemove.patientId);
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.id !== appointmentToRemove.id
  );
  let filteredPatientAppointments = patient.appointments.filter(
    (appointment) => appointment.id !== appointmentToRemove.id
  );
  patient.appointments = filteredPatientAppointments;
  updatePatient(patient);
  saveToStorage("appointmentsDB", filteredAppointments);
  return filteredAppointments;
}

export function updateAppointment(updatedAppointment) {
  let appointments = loadFromStorage("appointmentsDB");
  let patient = getPatientByIdLocal(updatedAppointment.patientId);
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.id !== updatedAppointment.id
  );
  let filteredPatientAppointments = patient.appointments.filter(
    (appointment) => appointment.id !== updatedAppointment.id
  );
  filteredAppointments.push(updatedAppointment);
  filteredPatientAppointments.push(updatedAppointment);
  patient.appointments = filteredPatientAppointments;
  saveToStorage("appointmentsDB", filteredAppointments);
  updatePatient(patient);
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
    // sessionStorage.setItem("patient", JSON.stringify(patientToSave));
    document.cookie = `patient=${JSON.stringify(patientToSave)};max-age=604800`;
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

export function makeAnAvatar(fullName) {
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

export function saveToStorage(key, value) {
  return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromStorage(key) {
  return undefined;
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : undefined;
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
