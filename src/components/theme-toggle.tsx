import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, persistTheme, readTheme, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const next = readTheme();
    setTheme(next);
    applyTheme(next);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    persistTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid size-9 place-items-center rounded-md text-muted transition-[color,background-color] duration-150 hover:bg-surface-2 hover:text-fg"
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      title={theme === "light" ? "Dark" : "Light"}
    >
      {theme === "light" ? (
        <Moon className="size-4" strokeWidth={1.75} />
      ) : (
        <Sun className="size-4" strokeWidth={1.75} />
      )}
    </button>
  );
}
