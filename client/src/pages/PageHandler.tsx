import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import App from "@pages/app/App";
import { LoginPage } from "@pages/login/LoginPage";
import { ThemeContext } from "@root/context/ThemeContext";
import { AuthContext } from "@root/context/AuthContext";
import { AlertStack } from "@root/components/AlertStack";
import { TodosContext } from "@root/context/TodosContext";

export const PageHandler: React.FC = () => {
    const { isAuthenticated, hasChecked } = useContext(AuthContext)!;
    const { fetchTodos } = useContext(TodosContext)!;
    const { theme } = useContext(ThemeContext)!;

    const [ fetchedTodos, setFetchedTodos ] = useState(false);

    useEffect(() => {
        if (!fetchedTodos && isAuthenticated && hasChecked) {
            fetchTodos();
            setFetchedTodos(true);
        }
    }, [fetchTodos, fetchedTodos, hasChecked, isAuthenticated, setFetchedTodos])

    return (
        <Box>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme></CssBaseline>
                {
                    isAuthenticated ?
                        <App /> :
                        hasChecked ?
                            <LoginPage /> :
                            <Box></Box>
                }
                <AlertStack></AlertStack>
            </ThemeProvider>
        </Box>
    );
};
