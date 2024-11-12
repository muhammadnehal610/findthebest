import { connectDB } from "@/lib/db/connectDB";
import Image from "next/image";
import { auth, signOut } from "../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  // console.log("session in home=>", session);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold">Find Your Fainds </h1>
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit">Sign Out</Button>
        </form>
      ) : (
        <Link href={"/signin"}>
          <Button>Sign in</Button>
        </Link>
      )}
    </div>
  );
}
