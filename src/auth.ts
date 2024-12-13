import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import connectdb from "../lib/db";
import { routeLinks } from "./utils/routerLinks";

interface User {
    _id: string;
    email: string;
    password: string;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };

                if (!email || !password) {
                    return null;
                }

                const db = await connectdb();
                const user = await db?.collection<User>("users").findOne({ email });

                if (user) {
                    const isValidPassword = await compare(password, user.password);
                    if (isValidPassword) {
                        return { id: user._id, email: user.email };
                    }
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: routeLinks.signin
    }
});

export { handler as GET, handler as POST };