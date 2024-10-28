import { useState, useMemo, useContext, createContext, useEffect } from "react";
import {
    ThemeProvider,
    CssBaseline,
    Stack,
    Typography,
    IconButton,
    useMediaQuery,
    Avatar,
    Grid2,
} from "@mui/material";
import { FaMoon, FaSun } from "react-icons/fa";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import TodoEditor from "@components/TodoEditor";
import { getTheme } from "@root/styles/theme";
import { LeftNavbar } from "./LeftNavbar";
import "@styles/Tiptap.css";
import "@styles/App.css";
import { TodosContext } from "@context/TodosContext";
import GoogleLoginButton from "./GoogleLoginButton";
import { getData, ITodoData } from "@services/api";
import { actionTypes } from "@root/context/useTodosReducer";

interface ThemeContextType {
    mode: "light" | "dark";
    themePrompt: string;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

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

const App = () => {
    const [mode, setMode] = useState<"light" | "dark">(getBrowserThemeColor());
    const [drawerOpen, setDrawerOpen] = useState(false);

    const authToken = sessionStorage.getItem("authToken");
    const [isAuthenticated, setIsAuthenticated] = useState(
        authToken != null || false
    );

    const theme = useMemo(() => getTheme(mode), [mode]);

    const isMobile = useMediaQuery(() => theme.breakpoints.down("sm"));

    const context = useContext(TodosContext);
    if (!context) return;
    const { todos, selectedTodoId, dispatch } = context;

    const toggleTheme = () =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

    // Define the themePrompt based on the mode
    const themePrompt =
        mode === "light" ? "Light mode active" : "Dark mode enabled";

    // Create the theme context value
    const themeContextValue: ThemeContextType = {
        mode,
        themePrompt,
    };

    if (!isAuthenticated) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                >
                    <GoogleLoginButton
                        onLoginSuccess={() => {
                            const fetchTodos = async () => {
                                const data: ITodoData[] = await getData();
                                dispatch({
                                    type: actionTypes.SET_TODOS,
                                    payload: data,
                                });
                                if (data?.length > 0) {
                                    dispatch({
                                        type: actionTypes.SET_SELECTED_TODO,
                                        payload: data[0]?.id,
                                    });
                                }
                            };

                            fetchTodos();
                            setIsAuthenticated(true);
                        }}
                    />
                </Stack>
            </ThemeProvider>
        );
    }

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Stack direction="row" height="100vh" maxHeight={"100%"}>
                    <LeftNavbar
                        drawerOpen={drawerOpen}
                        setDrawerOpen={setDrawerOpen}
                        isMobile={isMobile}
                    />
                    <Stack
                        flex={1}
                        p={2}
                        spacing={2}
                        sx={{
                            overflowY: "auto",
                            overflowX: "hidden",
                            maxWidth: "100%",
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ width: "100%" }}
                        >
                            {isMobile && (
                                <IconButton
                                    onClick={() => setDrawerOpen(true)}
                                    sx={{ m: 1 }}
                                >
                                    <MenuIcon></MenuIcon>
                                </IconButton>
                            )}
                            <Typography
                                variant="h4"
                                align="center"
                                sx={{ flexGrow: 1, textAlign: "center" }}
                            >
                                {todos.find(
                                    (item) => item.id === selectedTodoId
                                )?.title || "Select a Todo"}
                            </Typography>
                            <Grid2 container spacing={2}>
                                <IconButton
                                    onClick={toggleTheme}
                                    sx={{
                                        color:
                                            mode === "light"
                                                ? "rgba(0, 0, 0, 0.54)"
                                                : "white",
                                    }}
                                >
                                    {mode === "light" ? <FaMoon /> : <FaSun />}
                                </IconButton>
                                <IconButton>
                                    <Avatar>AM</Avatar>
                                </IconButton>
                            </Grid2>
                        </Stack>
                        <Stack alignItems="center" sx={{ flexGrow: 1 }}>
                            {todos.length > 0 && (
                                <TodoEditor
                                    key={selectedTodoId}
                                    todo={todos.find(
                                        (todo) => todo.id === selectedTodoId
                                    )}
                                />
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
export default App;
