import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import type { Theme } from "@/lib/theme";

export function AppToaster() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const sync = () => {
      setTheme(
        document.documentElement.classList.contains("light") ? "light" : "dark",
      );
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Toaster
      theme={theme}
      position="bottom-center"
      toastOptions={{
        className:
          "!bg-surface !text-fg !border-border !shadow-[var(--shadow-border)]",
      }}
    />
  );
}
