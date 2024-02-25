import clsx from "clsx";
import { ReactNode, createContext, useState } from "react";

export interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={clsx("text-foreground bg-background p-6 md:p-12 lg:p-12 min-w-[479px]", theme)}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
