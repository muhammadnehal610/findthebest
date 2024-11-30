import { connectDB } from "@/lib/db/connectDB";
import { UserModal } from "@/lib/modals/user";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handleUser = async (profile) => {
  await connectDB();
  const user = await UserModal.findOne({ email: profile.email }).lean();

  if (user) {
    return user;
  }

  const newUser = await UserModal.create({
    fullname: profile.name,
    email: profile.email,
    password: profile.at_hash,
    profileImg: profile.picture,
  });

  return newUser.toObject();
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // console.log("SignIn callback triggered", { account, profile });
      await handleUser(profile);
      return true;
    },
    async jwt({ token, user }) {
      // console.log("JWT callback triggered", { token, user });
      const userFromDB = await handleUser(token);
      if (userFromDB) {
        token._id = userFromDB._id.toString();
        token.role = userFromDB.role;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Session callback triggered", { session, token });
      session.user.id = token.id;
      session.user._id = token._id;
      session.user.role = token.role;
      return session;
    },
  },
  debug: true, // Enable debug messages
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
