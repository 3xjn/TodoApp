import { DragDropContext } from "@hello-pangea/dnd";
import { Stack, Drawer, Box } from "@mui/material";
import { TodosContext } from "@context/TodosContext";
import React, { useContext } from "react";
import { TodoList } from "./TodoList";

const drawerWidth = 240;

interface LeftNavbarProps {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isMobile: boolean;
}

export const LeftNavbar: React.FC<LeftNavbarProps> = ({
    drawerOpen,
    setDrawerOpen,
    isMobile,
}) => {
    const {
        todos,
        onSetTodo,
    } = useContext(TodosContext)!;

    return (
        <DragDropContext
            onDragEnd={(result) => {
                const { source, destination } = result;

                // check if was dragged
                if (!destination || destination.index === source.index) {
                    return;
                }

                const updatedTodos = Array.from(todos);

                // remove dragged todo
                const [movedTodo] = updatedTodos.splice(source.index, 1);

                // add at new spot
                updatedTodos.splice(destination.index, 0, movedTodo);

                // set order of todos to their new indices
                const updates = updatedTodos.map((todo, index) => ({
                    order: index,
                    ...todo,
                }));

                onSetTodo(updates);
            }}
        >
            <Stack
                width={drawerWidth}
                borderRight={1}
                borderColor="divider"
                height={"100%"}
                sx={{
                    display: isMobile && !drawerOpen ? "none" : "initial",
                }}
            >
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={document.body}
                        variant={"temporary"}
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            width: drawerWidth,
                            display: { xs: "block", sm: "none" },
                            flexShrink: 0,
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                                overflow: "none",
                                position: "relative",
                                zIndex: (theme) => theme.zIndex.modal + 1,
                            },
                        }}
                    >
                        <TodoList />
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                        open
                    >
                        <TodoList />
                    </Drawer>
                </Box>
            </Stack>
        </DragDropContext>
    );
};
