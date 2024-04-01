setAdmins();

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
                icon: (
                  <Diversity1Icon fontSize="large" sx={{ color: "#ffc65c" }} />
                ),
                content:
                  "Our clinic takes a holistic approach to laser hair removal, where our expert team considers individual needs and concerns, ensuring a comprehensive and personalized treatment experience.",
              },
              {
                title: "Customized treatment plan",
                icon: (
                  <EventAvailableIcon
                    fontSize="large"
                    sx={{ color: "#ffc65c" }}
                  />
                ),
                content:
                  "Each client receives a customized treatment plan tailored to their unique hair type, skin tone, and desired outcome, guaranteeing optimal results and satisfaction.",
              },
              {
                title: "Keeping clean and sterilized",
                icon: (
                  <CleanHandsIcon fontSize="large" sx={{ color: "#ffc65c" }} />
                ),
                content:
                  "We prioritize cleanliness and sterilization in every aspect of our clinic, maintaining rigorous standards to ensure a safe and hygienic environment for all our clients.",
              },
              {
                title: "Availability and easy access",
                icon: (
                  <AdsClickIcon fontSize="large" sx={{ color: "#ffc65c" }} />
                ),
                content:
                  "With convenient online scheduling, we offer flexible appointment availability for our clients, ensuring easy access to our services at their preferred times.",
              },
            ],
          },
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
