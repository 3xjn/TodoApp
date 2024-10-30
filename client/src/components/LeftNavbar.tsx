import { DragDropContext, DropResult } from "@hello-pangea/dnd";
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
    const { todos, onSetTodo } = useContext(TodosContext)!;

    const handleDragEnd = (result: DropResult<string>) => {
        const { source, destination } = result;
    
        // Check if the item was dropped outside the list
        if (!destination) return;
    
        // Check if the item was dropped in the same position
        if (source.index === destination.index) return;
    
        // Update the todos array
        const updatedTodos = Array.from(todos);
        const [removedTodo] = updatedTodos.splice(source.index, 1);
        updatedTodos.splice(destination.index, 0, removedTodo);
    
        // Update the order of the todos
        const updates = updatedTodos.map((todo, index) => ({
            ...todo,
            order: index,
        }));
    
        onSetTodo(updates);
    };

    return (
        <DragDropContext
            onDragEnd={handleDragEnd}
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
