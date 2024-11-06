import React, { useContext, useMemo } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import { Button, List, ListItem, Stack } from "@mui/material";
import DrawerItem from "./DrawerItem";
import { TodosContext } from "@context/TodosContext";

interface TodoListProps {
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoList: React.FC<TodoListProps> = ({
    setDrawerOpen
}) => {
    const {
        todos,
        onAddTodo,
        onUpdateTodo,
    } = useContext(TodosContext)!;

    const sortedTodos = useMemo(
        () => [...todos].sort((a, b) => (a.order || 0) - (b.order || 0)),
        [todos]
    );

    const handleDragEnd = (result: DropResult<string>) => {
        const { source, destination } = result;

        if (!destination || source.index === destination.index) return;

        const [movedTodo] = todos.splice(source.index, 1);
        todos.splice(destination.index, 0, movedTodo);

        const minIndex = Math.min(source.index, destination.index);
        const maxIndex = Math.max(source.index, destination.index);
        for (let i = minIndex; i <= maxIndex; i++) {
            onUpdateTodo(todos[i].id, { ...todos[i], order: i }, false);
        }
    };    

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Stack>
                <Button onClick={() => onAddTodo()} sx={{ m: 1 }}>
                    Add Todo
                </Button>
                <Droppable droppableId="todo-list">
                    {(provided) => (
                        <List
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                maxHeight: "100%",
                                overflowY: "auto",
                            }}
                        >
                            {sortedTodos.map((todo, index) => (
                                <Draggable
                                    key={todo.id}
                                    draggableId={todo.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <ListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                ...provided.draggableProps
                                                    .style,
                                                cursor: "grab",
                                                userSelect: "none",
                                                padding: "0",
                                            }}
                                        >
                                            <DrawerItem
                                                todo={todo}
                                                setDrawerOpen={setDrawerOpen}
                                            />
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </Stack>
        </DragDropContext>
    );
};
