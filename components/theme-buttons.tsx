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
          className="flex items-center gap-2 w-full justify-start"
          onClick={() => setTheme("light")}
        >
          <Sun />
          <span>Light Mode</span>
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-start"
          onClick={() => setTheme("dark")}
        >
          <Moon />
          <span>Dark Mode</span>
        </Button>
      )}
    </div>
  );
}
