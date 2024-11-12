import { connectDB } from "@/lib/db/connectDB";
import { UserModal } from "@/lib/modals/user";
import { connect, connection, Schema } from "mongoose";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// const UserModal =
//   connection.models.users ||
//   connection.model(
//     "users",
//     new Schema({
//       fullname: String,
//       email: String,
//       password: String,
//       profileImg: String,
//       role: { type: String, default: "user" },
//     })
//   );

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

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      await handleUser(profile);
      return true;
    },
    async jwt({ token, user }) {
      const userFromDB = await handleUser(token);
      if (userFromDB) {
        token._id = userFromDB._id.toString();
        token.role = userFromDB.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user._id = token._id;
      session.user.role = token.role;
      return session;
    },
  },
});
