import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// async function main() {
//   const hashedPassword = await bcrypt.hash("demo123", 10);
//   const patient = await prisma.patient.create({
//     data: {
//       fullName: "Demo User",
//       email: "demo@gmail.com",
//       phoneNumber: "0501234568",
//       password: hashedPassword,
//       avatar: {
//         initials: "DU",
//         color: "red",
//       },
//     },
//   });
//   console.log(patient);
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
