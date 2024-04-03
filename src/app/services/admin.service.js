setAdmins();
setConstData();

export const HomePageDictionary = [
  {
    id: "aboutUs.title",
    value: "Welcome to our clinic - Laser Hair Removal Treatment Center!",
    label: "First section main title",
  },
  {
    id: "aboutUs.main",
    value: [
      {
        id: "p1",
        p: "Our clinic is a small and intimate establishment specializing in laser hair removal treatments. We believe in a personal and warm approach to every client, and we are committed to providing you with the best service in a pleasant and personal atmosphere.",
      },
      {
        id: "p2",
        p: "We invite you to join us and enjoy our professional and personal service, for a worry-free experience with impressive results. ",
      },
    ],
    label: "Text about the clinic ",
  },
  {
    id: "whyChooseUs.title",
    value: "Why choose us ?",
    label: "Second section main title",
  },
  {
    id: "whyChooseUs.listContent",
    value: [
      {
        id: "p3",
        title: "Holistic approach by experts",
        icon: "person-icon",
        p: "Our clinic takes a holistic approach to laser hair removal, where our expert team considers individual needs and concerns, ensuring a comprehensive and personalized treatment experience.",
      },
      {
        id: "p4",
        title: "Customized treatment plan",
        icon: "calendar-icon",
        p: "Each client receives a customized treatment plan tailored to their unique hair type, skin tone, and desired outcome, guaranteeing optimal results and satisfaction.",
      },
      {
        id: "p5",
        title: "Keeping clean and sterilized",
        icon: "clean-icon",
        p: "We prioritize cleanliness and sterilization in every aspect of our clinic, maintaining rigorous standards to ensure a safe and hygienic environment for all our clients.",
      },
      {
        id: "p6",
        title: "Availability and easy access",
        icon: "site-icon",
        p: "With convenient online scheduling, we offer flexible appointment availability for our clients, ensuring easy access to our services at their preferred times.",
      },
    ],
    label: "Reasons of why choose us",
  },
];

export const OurTreatmentsDictionary = [
  {
    id: "treatments.title",
    value: "Our treatments",
    label: "Main title",
  },
  {
    id: "treatments.p",
    value:
      "At our hair removal clinic, we prioritize gentle and effective care for our clients. Our state-of-the-art facility utilizes advanced laser technology, such as diode lasers or intense pulsed light (IPL), to target unwanted hair with precision and minimal discomfort. We understand the sensitivity of skin in these treatments, which is why our trained professionals ensure each session is tailored to individual needs, considering skin type and hair texture. Additionally, we offer a range of soothing products designed to enhance post-treatment comfort and promote skin recovery, ensuring a smooth and satisfying experience for every client.",
    label: "Main paragraph",
  },
  {
    id: "treatments.treatments",
    value: [
      {
        id: "t1",
        title: "בית שחי",
        duration: 30,
        price: 200,
      },
      {
        id: "t2",
        title: "רגליים",
        duration: 60,
        price: 400,
      },
      {
        id: "t3",
        title: "ידיים",
        duration: 45,
        price: 200,
      },
      {
        id: "t4",
        title: "שפם",
        duration: 30,
        price: 150,
      },
      {
        id: "t5",
        title: "מפשעות",
        duration: 30,
        price: 200,
      },
      {
        id: "t6",
        title: "בטן",
        duration: 30,
        price: 150,
      },
    ],
    label: "Available Treatments",
  },
];

export const AppointmentsDictionary = [
  {
    id: "durationBetweenTreatments",
    value: 3,
    label: "Duration between treatments",
  },
  {
    id: "businessHours",
    value: [
      {
        id: "business1",
        daysOfWeek: [0, 1, 2, 4],
        startTime: "09:00",
        endTime: "18:00",
      },
      {
        id: "business2",
        daysOfWeek: [3],
        startTime: "09:00",
        endTime: "14:00",
      },
    ],
    label: "Business Hours",
  },
];

function setConstData() {
  let data = loadFromStorage("dataDB");
  if (!data) {
    data = [
      {
        id: "home-page",
        content: {
          aboutUs: {
            title:
              "Welcome to our clinic - Laser Hair Removal Treatment Center!",
            main: [
              {
                id: "p1",
                p: "Our clinic is a small and intimate establishment specializing in laser hair removal treatments. We believe in a personal and warm approach to every client, and we are committed to providing you with the best service in a pleasant and personal atmosphere.",
              },
              {
                id: "p2",
                p: "We invite you to join us and enjoy our professional and personal service, for a worry-free experience with impressive results. ",
              },
            ],
          },
          whyChooseUs: {
            title: "Why choose us ?",
            listContent: [
              {
                title: "Holistic approach by experts",
                icon: "person-icon",
                content:
                  "Our clinic takes a holistic approach to laser hair removal, where our expert team considers individual needs and concerns, ensuring a comprehensive and personalized treatment experience.",
              },
              {
                title: "Customized treatment plan",
                icon: "calendar-icon",
                content:
                  "Each client receives a customized treatment plan tailored to their unique hair type, skin tone, and desired outcome, guaranteeing optimal results and satisfaction.",
              },
              {
                title: "Keeping clean and sterilized",
                icon: "clean-icon",
                content:
                  "We prioritize cleanliness and sterilization in every aspect of our clinic, maintaining rigorous standards to ensure a safe and hygienic environment for all our clients.",
              },
              {
                title: "Availability and easy access",
                icon: "site-icon",
                content:
                  "With convenient online scheduling, we offer flexible appointment availability for our clients, ensuring easy access to our services at their preferred times.",
              },
            ],
          },
        },
      },
      {
        id: "our-treatments",
        content: {
          treatments: {
            title: "Our treatments",
            paragraph:
              "At our hair removal clinic, we prioritize gentle and effective care for our clients. Our state-of-the-art facility utilizes advanced laser technology, such as diode lasers or intense pulsed light (IPL), to target unwanted hair with precision and minimal discomfort. We understand the sensitivity of skin in these treatments, which is why our trained professionals ensure each session is tailored to individual needs, considering skin type and hair texture. Additionally, we offer a range of soothing products designed to enhance post-treatment comfort and promote skin recovery, ensuring a smooth and satisfying experience for every client.",
            image: "treatment-areas",
            treatments: [
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
            ],
          },
        },
      },
      {
        id: "appointments",
        content: {
          durationBetweenTreatments: 3,
          businessHours: [
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
          ],
        },
      },
    ];
    saveToStorage("dataDB", data);
  }
}

function setAdmins() {
  let admins = loadFromStorage("adminDB");
  if (!admins) {
    admins = [
      {
        id: "a1",
        email: "admin123@gmail.com",
        isAdmin: true,
        userName: "admin1",
        password: "Admin123!",
        avatar: {
          initials: "A1",
          color: " rgb(47, 72, 174)",
        },
      },
    ];
    saveToStorage("adminDB", admins);
  }
}
export function getData(dataId) {
  const data = loadFromStorage("dataDB");
  if (dataId) {
    const currentData = data.find((data) => data.id === dataId);
    return currentData;
  } else return data;
}

export function getAdmin(credentials) {
  const admins = loadFromStorage("adminDB");
  const admin = admins.find((admin) => admin.email === credentials.email);
  if (!admin) return "Wrong email or password";
  if (admin.password === credentials.password) {
    const { email, userName, id, isAdmin, avatar } = admin;
    const userToSave = { email, userName, id, isAdmin, avatar };
    document.cookie = `admin=${JSON.stringify(userToSave)};max-age=604800`;

    return userToSave;
  } else return "Wrong email or password";
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : undefined;
}
