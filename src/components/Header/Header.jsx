import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { auth, signOut } from "../../../auth";
import Link from "next/link";

export default async function Header({ session }) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">FIND THE BEST</h1>
        {session?.user ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">
              {session.user.name}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name}
                    />
                    <AvatarFallback>
                      {session.user.name ? (
                        session.user.name[0].toUpperCase()
                      ) : (
                        <User />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <button type="submit">Sign Out</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button variant="outline">
            <Link href={"/signin"}>Log in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
