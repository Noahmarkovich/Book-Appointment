import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// async function main() {
//   const treatments = await prisma.treatment.findMany({});
//   //   await prisma.content.deleteMany({});
//   const content = await prisma.content.createMany({
//     data: [
//       {
//         id: "home-page",
//         content: {
//           aboutUs: {
//             title:
//               "Welcome to our clinic - Laser Hair Removal Treatment Center!",
//             main: [
//               {
//                 id: "p1",
//                 p: "Our clinic is a small and intimate establishment specializing in laser hair removal treatments. We believe in a personal and warm approach to every client, and we are committed to providing you with the best service in a pleasant and personal atmosphere.",
//               },
//               {
//                 id: "p2",
//                 p: "We invite you to join us and enjoy our professional and personal service, for a worry-free experience with impressive results. ",
//               },
//             ],
//           },
//           whyChooseUs: {
//             title: "Why choose us ?",
//             listContent: [
//               {
//                 id: "w1",
//                 title: "Holistic approach by experts",
//                 icon: "person-icon",
//                 p: "Our clinic takes a holistic approach to laser hair removal, where our expert team considers individual needs and concerns, ensuring a comprehensive and personalized treatment experience.",
//               },
//               {
//                 id: "w2",
//                 title: "Customized treatment plan",
//                 icon: "calendar-icon",
//                 p: "Each client receives a customized treatment plan tailored to their unique hair type, skin tone, and desired outcome, guaranteeing optimal results and satisfaction.",
//               },
//               {
//                 id: "w3",
//                 title: "Keeping clean and sterilized",
//                 icon: "clean-icon",
//                 p: "We prioritize cleanliness and sterilization in every aspect of our clinic, maintaining rigorous standards to ensure a safe and hygienic environment for all our clients.",
//               },
//               {
//                 id: "w4",
//                 title: "Availability and easy access",
//                 icon: "site-icon",
//                 p: "With convenient online scheduling, we offer flexible appointment availability for our clients, ensuring easy access to our services at their preferred times.",
//               },
//             ],
//           },
//         },
//       },
//       {
//         id: "our-treatments",
//         content: {
//           treatments: {
//             title: "Our treatments",
//             p: "At our hair removal clinic, we prioritize gentle and effective care for our clients. Our state-of-the-art facility utilizes advanced laser technology, such as diode lasers or intense pulsed light (IPL), to target unwanted hair with precision and minimal discomfort. We understand the sensitivity of skin in these treatments, which is why our trained professionals ensure each session is tailored to individual needs, considering skin type and hair texture. Additionally, we offer a range of soothing products designed to enhance post-treatment comfort and promote skin recovery, ensuring a smooth and satisfying experience for every client.",
//             image: "treatment-areas",
//             treatments: treatments,
//           },
//         },
//       },
//       {
//         id: "appointments",
//         content: {
//           durationBetweenTreatments: 3,
//           businessHours: [
//             {
//               daysOfWeek: [0, 1, 2, 4],
//               startTime: "09:00",
//               endTime: "18:00",
//             },
//             {
//               daysOfWeek: [3],
//               startTime: "09:00",
//               endTime: "14:00",
//             },
//           ],
//         },
//       },
//     ],
//   });
//   //   //   console.log(user);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

//   password : "Nn12345!"
