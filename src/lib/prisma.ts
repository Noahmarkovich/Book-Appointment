import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       fullName: "Noah Markovich",
//       email: "noah@gmail.com",
//       password: "$2a$10$IN7YB9hWS0HiZYoVPcI4hOM5T78z61qd9CCYr1j54b2Gif1NaFpI.",
//       avatar: {
//         initials: "NM",
//         color: "#800080",
//       },
//       role: "ADMIN",
//     },
//   });
//   console.log(user);
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
