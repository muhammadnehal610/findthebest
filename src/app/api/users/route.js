import { connectDB } from "@/lib/db/connectDB";
import { UserModal } from "@/lib/modals/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function GET(request) {
  await connectDB();
  console.log("request", connectDB());
  const users = await UserModal.find();
  return Response.json(
    {
      msg: "Users Fetched Successfully",
      users,
    },
    { status: 200 }
  );
}

export async function POST(request) {
  await connectDB();
  const obj = await request.json();

  // user axist OR not

  const user = await UserModal.findOne({ email: obj.email });

  if (user) {
    return Response.json(
      { error: true, msg: "user with this email already exist" },
      { status: 403 }
    );
  }

  const saltRounds = 10;

  const hashPassWord = await bcrypt.hash(obj.password, saltRounds);
  obj.password = hashPassWord;
  console.log("password=>", obj.password);

  let newUser = new UserModal(obj);
  await newUser.save();

  var token = jwt.sign(
    { id: newUser._id, role: newUser.role },
    process.env.JWT_KEY
  );

  return Response.json(
    {
      msg: "Users Added Successfully ",
      user: newUser,
      token,
    },
    { status: 201 }
  );
}

export async function PUT(request) {}

export async function DELETE(request) {}
