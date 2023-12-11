"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeButtons() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      {theme === "dark" ? (
        <Button className="p-2" onClick={() => setTheme("light")}>
          <Sun />
        </Button>
      ) : (
        <Button className="p-2" onClick={() => setTheme("dark")}>
          <Moon />
        </Button>
      )}
    </div>
  );
}
