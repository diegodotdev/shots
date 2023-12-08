import { cn } from "@/lib/utils";
import { Lobster } from "next/font/google";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function App() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <p>
        Welcome to
        <br />
        <span className={cn(lobster.className, "text-7xl")}>Shots</span>
      </p>
    </div>
  );
}
