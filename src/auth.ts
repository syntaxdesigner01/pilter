import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
    id: string;
    name: string;
    email: string;
}

const users = [
    {
        id: "1",
        name: 'Joseph Akpan',
        email: 'akpanjoseph2021@gmail.com',
        password: '1111'
    }
];

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
                const email = credentials.email as string;
                const password = credentials.password as string;

                const existingUser = users.find(user => user.email === email);
                if (existingUser) {
                    if (existingUser.password === password) {
                        return {
                            id: existingUser.id,
                            name: existingUser.name,
                            email: existingUser.email,
                        } as User;
                    } else {
                        return null;
                    }
                } else {
                    const newUser = {
                        id: String(users.length + 1),
                        name: email.split('@')[0],
                        email,
                        password
                    };
                    users.push(newUser);
                    return {
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                    } as User;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
};

export default NextAuth(authOptions);