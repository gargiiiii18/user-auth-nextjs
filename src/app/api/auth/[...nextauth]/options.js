import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { initMongoose } from "../../../../lib/mongoose";
import Users from "../../../../models/Users";

export const authOptions= {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
            await initMongoose();

            try {
                const user = await Users.findOne({
                    $or [
                        {email: credentials.identifier.email},
                        {username: credentials.identifier.username},
                    ]
                })
            } catch (error) {
                throw new Error(error);
            }

            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
          
            if (user) {
                  // Any object returned will be saved in `user` property of the JWT
                return user
            } else {
                  // If you return null then an error will be displayed advising the user to check their details.
                return null
          
                  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
        },
    }
        )
    
    ]
}