import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useContext } from "react";
import App from "@pages/app/App";
import { LoginPage } from "@pages/login/LoginPage";
import { ThemeContext } from "@root/context/ThemeContext";
import { AuthContext } from "@root/context/AuthContext";
import { AlertStack } from "@root/components/AlertStack";

export const PageHandler: React.FC = () => {
    const authContext = useContext(AuthContext);
    const themeContext = useContext(ThemeContext);

    if (!authContext || !themeContext) return;

    const { isAuthenticated } = authContext;
    const { theme } = themeContext;

    return (
        <Box>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme></CssBaseline>
                {isAuthenticated ? <App /> : <LoginPage />}
                <AlertStack></AlertStack>
            </ThemeProvider>
        </Box>
    );
};
