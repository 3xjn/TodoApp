import React, { useState, useMemo, useContext } from "react";
import {
    Stack,
    Typography,
    IconButton,
    useMediaQuery,
    Grid2,
} from "@mui/material";
import { FaMoon, FaSun } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import TodoEditor from "@components/TodoEditor";
import { getTheme } from "@root/styles/theme";
import { LeftNavbar } from "@components/LeftNavbar";
import { TodosContext } from "@context/TodosContext";
import { ThemeContext } from "@context/ThemeContext";
import { AvatarMenu } from "@root/components/AvatarMenu";

const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const { todos, selectedTodoId } = useContext(TodosContext)!;
    const { mode, toggleTheme } = useContext(ThemeContext)!;

    const theme = useMemo(() => getTheme(mode), [mode]);
    const isMobile = useMediaQuery(() => theme.breakpoints.down("sm"));

    return (
        <Stack direction="row" height="100vh" maxHeight={"100%"} sx={{
            backgroundImage: "none"
        }}>
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
                        {todos.find((item) => item.id === selectedTodoId)
                            ?.title || "Select a Todo"}
                    </Typography>
                    <Grid2 container spacing={2}>
                        <IconButton onClick={toggleTheme}>
                            {mode === "light" ? <FaMoon /> : <FaSun />}
                        </IconButton>
                        <AvatarMenu></AvatarMenu>
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
    );
};

export default App;
