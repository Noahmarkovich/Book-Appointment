import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        //   const res = await fetch("/api/auth/login", {
        //     method: "POST",
        //     body: JSON.stringify(credentials),
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   });
        // const patient = await prisma.patient.findUnique({
        //   where: {
        //     email: credentials.email,
        //   },
        // });
        // const match = await bcrypt.compare(
        //   credentials.password,
        //   patient.password
        // );

        console.log(credentials);
        //   const user = await res.json()
        // if (!patient) return null;
        // If no error and we have user data, return it

        // if (res.ok && patient) {
        //   return patient;
        // }
        // Return null if user data could not be retrieved
        // return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
