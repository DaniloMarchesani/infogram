import clsx from "clsx";
import { ReactNode, createContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const checkSystemTheme = () => {
      if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme("dark")
      } else {
        setTheme("light")
      }
    };

    checkSystemTheme();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkSystemTheme);

  }, []);

 

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={clsx("text-foreground bg-background p-6 md:p-12 lg:p-12 min-w-[479px]", theme)}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
