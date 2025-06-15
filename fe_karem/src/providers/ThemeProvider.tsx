/**
 * Theme Provider for the KAREM frontend.
 * Manages application theming with support for light, dark, and system themes.
 * 
 * Features:
 * - Theme persistence using localStorage
 * - System theme detection
 * - Dynamic theme switching
 * - CSS class-based theme application
 * 
 * Theme Options:
 * - light: Light mode theme
 * - dark: Dark mode theme
 * - system: Follows system preferences
 * 
 * Implementation:
 * - Uses React Context for theme state management
 * - Automatically applies theme classes to root element
 * - Persists theme preference across sessions
 * 
 * Usage:
 * - Wrap application with ThemeProvider
 * - Use useTheme hook to access and modify theme
 * - Theme changes are immediately reflected in UI
 */

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
