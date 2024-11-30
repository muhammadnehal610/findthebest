import { redirect } from "next/navigation";
import { auth, signIn } from "../../../auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";
export default async function SignIn() {
  const session = await auth();
  console.log("session=>", session);
  if (session) {
    if (session.user.role == "user") redirect("/");
    if (session.user.role == "admin") redirect("/admin/dashboard");
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign in
            </CardTitle>
            <CardDescription className="text-center">
              to continue to FIND THE BEST
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 justify-center">
            <button
              className="bg-black text-white h-10 flex items-center justify-center w-fit py-4 px-4 "
              type="submit"
            >
              {" "}
              <span>SignIn with Google</span>
            </button>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-center text-gray-700 mt-4">
              By signing in, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
