import { Theme } from "@mui/material";
import { getTheme } from "@root/styles/theme";
import React, { useMemo, useState } from "react";

function getBrowserThemeColor() {
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return "dark";
    } else {
        return "light";
    }
}

interface ThemeContextType {
    mode: "light" | "dark";
    toggleTheme: () => void;
    theme: Theme;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [mode, setMode] = useState<"light" | "dark">(getBrowserThemeColor());
    const toggleTheme = () => {
        setMode((prevMode: string) => (prevMode === "light" ? "dark" : "light"));
    };

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    )
};

export { ThemeContext, ThemeContextProvider };