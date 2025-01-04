import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials.");
        }

        try {
          // Cari pengguna berdasarkan username
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });

          // Jika pengguna tidak ditemukan
          if (!user) {
            console.error("[AUTH] User not found.");
            return null;
          }

          // Validasi password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.error("[AUTH] Invalid password.");
            return null;
          }

          // Return data pengguna (tanpa password)
          return {
            id: user.id,
            username: user.username,
            role: user.role,
          };
        } catch (error) {
          console.error("[AUTH] Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Menambahkan data username dan role ke sesi
      session.user.username = token.username;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username; // Menambahkan username ke token
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET, // Pastikan ini diatur di environment
});
