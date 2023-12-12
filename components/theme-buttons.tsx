"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeButtons() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      {theme === "dark" ? (
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-center md:justify-start"
          onClick={() => setTheme("light")}
        >
          <Sun />
          <span className="hidden md:inline">Light Mode</span>
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-center md:justify-start"
          onClick={() => setTheme("dark")}
        >
          <Moon />
          <span className="hidden md:inline">Dark Mode</span>
        </Button>
      )}
    </div>
  );
}
