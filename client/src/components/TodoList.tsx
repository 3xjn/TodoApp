import React, { useContext } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { List, ListItem } from "@mui/material";
import { ITodoData } from "../services/api";
import DrawerItem from "./DrawerItem";
import { TodosContext } from "@context/TodosContext";
import { actionTypes } from "@context/useTodosReducer";

export const TodoList: React.FC = () => {
    const {
        todos,
        selectedTodoId,
        onUpdateTodo,
        onDeleteTodo,
        dispatch,
    } = useContext(TodosContext)!;

    return (
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
                    {todos
                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                        .map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                {(provided) => (
                                    <ListItem
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            cursor: "grab",
                                            userSelect: "none",
                                            padding: "0",
                                        }}
                                    >
                                        <DrawerItem
                                            todo={todo}
                                            isSelected={selectedTodoId === todo.id}
                                            onSelect={() =>
                                                dispatch({
                                                    type: actionTypes.SET_SELECTED_TODO,
                                                    payload: todo.id,
                                                })
                                            }
                                            onUpdate={(updates: Partial<ITodoData>) =>
                                                onUpdateTodo(todo.id, updates)
                                            }
                                            onDelete={() => onDeleteTodo(todo.id)}
                                        />
                                    </ListItem>
                                )}
                            </Draggable>
                        ))}
                    {provided.placeholder}
                </List>
            )}
        </Droppable>
    )
};