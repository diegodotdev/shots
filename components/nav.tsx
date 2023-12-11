import Link from "next/link";
import { Lobster } from "next/font/google";
import { signOut, signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function Nav() {
  const { data: session } = useSession();

  return (
    <header className="w-full grid place-items-center h-[12vh] border-b border-gray-200">
      <div className="w-[90vw] md:w-[80vw] mx-auto flex justify-between h-full items-center">
        <Link href="/">
          <span className={cn("text-4xl", lobster.className)}>Shots</span>
        </Link>
        {session ? (
          <Button onClick={() => signOut()} className="text-white">
            Sign Out
          </Button>
        ) : (
          <Button onClick={() => signIn()} className="text-white">
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
