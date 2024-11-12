import { connectDB } from "@/lib/db/connectDB";
import { UserModal } from "@/lib/modals/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// export async function GET(request) {
//   await connectDB();
//   console.log("request", connectDB());
//   const users = await UserModal.find();
//   return Response.json(
//     {
//       msg: "Users Fetched Successfully",
//       users,
//     },
//     { status: 200 }
//   );
// }

export async function POST(request) {
  await connectDB();
  const obj = await request.json();

  // user axist OR not

  const user = await UserModal.findOne({ email: obj.email });

  if (!user) {
    return Response.json(
      { error: true, msg: "user not found" },
      { status: 403 }
    );
  }

  const isPasswordValid = await bcrypt.compare(obj.password, user.password);

  if (!isPasswordValid) {
    return Response.json(
      { error: true, msg: "password is not valid" },
      { status: 403 }
    );
  }

  var token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY);

  return Response.json(
    {
      msg: "Users login Successfully ",
      user,
      token,
    },
    { status: 200 }
  );
}

export async function PUT(request) {}

export async function DELETE(request) {}
