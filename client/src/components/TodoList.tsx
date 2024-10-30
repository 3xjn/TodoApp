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

export const TodoList: React.FC = () => {
    const {
        todos,
        onAddTodo,
        onUpdateTodo,
    } = useContext(TodosContext)!;

    // Memoize the sorted todos to avoid unnecessary re-renders
    const sortedTodos = useMemo(
        () => [...todos].sort((a, b) => (a.order || 0) - (b.order || 0)),
        [todos]
    );

    const handleDragEnd = (result: DropResult<string>) => {
        const { source, destination } = result;
    
        // Early return if dropped outside or in the same position
        if (!destination || source.index === destination.index) return;
    
        // Reorder todos without creating a new array
        const [movedTodo] = todos.splice(source.index, 1);
        todos.splice(destination.index, 0, movedTodo);
    
        // Identify only the reordered items and update them
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
