import { connectDB } from "@/lib/db/connectDB";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold">Find Your Fainds </h1>
    </div>
  );
}
