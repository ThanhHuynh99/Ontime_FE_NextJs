import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

const RESTRICTED_ROUTES = ['/login', '/sign-up', '/reset'];
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("Email and password are required.");
                }
                const res = await fetch("http://localhost:4000/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                if (!res.ok) {
                    throw new Error("Invalid credentials.");
                }
                const payload = await res.json();
                if (!payload.data) {
                    throw new Error(payload.message || "Failed to authenticate.");
                }

                const { token, expiresAt, account } = payload.data;

                return {
                    id: account.id,
                    name: account.name,
                    email: account.email,
                    token,
                    expiresAt,
                };
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        // authorized({ request: { nextUrl }, auth }) {
        //     const isLoggedIn = !!auth?.user;

        //     const { pathname } = nextUrl;
        //     const isRestrictedRoute = RESTRICTED_ROUTES.some((route) => pathname.startsWith(route));

        //     if (isLoggedIn && isRestrictedRoute) {
        //         return NextResponse.redirect(new URL("/", nextUrl));
        //     }

        //     return !!auth;
        // },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.token = user.token;
                token.expiresAt = user.expiresAt;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
            };
            session.token = token.token;
            session.expiresAt = token.expiresAt;

            return session;
        },
    },
})