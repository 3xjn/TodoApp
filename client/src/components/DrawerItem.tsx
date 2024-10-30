import React, { useState, useRef, useContext } from "react";
import {
    ListItemText,
    TextField,
    Menu,
    ListItemButton,
    IconButton,
} from "@mui/material";
import { ITodoData } from "@services/api";
import IconMenu from "@components/IconMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TodosContext } from "@root/context/TodosContext";
import { actionTypes } from "@root/context/useTodosReducer";

interface DrawerItemProps {
    todo: ITodoData;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
    todo,
}) => {
    const { onUpdateTodo, onDeleteTodo, selectedTodoId, dispatch } = useContext(TodosContext)!;

    const [isEditing, setIsEditing] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleRename = () => {
        setIsEditing(true);
        setAnchorEl(null);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUpdateTodo(todo.id, { title: event.target.value }, false);
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
        onUpdateTodo(todo.id, { title: inputRef.current?.value, id: todo.id }, true);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            setIsEditing(false);
            onUpdateTodo(todo.id, { title: inputRef.current?.value, id: todo.id }, true);
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    return (
        <ListItemButton selected={selectedTodoId === todo.id} onClick={() => {
            dispatch({
                type: actionTypes.SET_SELECTED_TODO,
                payload: todo.id,
            })
        }}>
            {isEditing ? (
                <TextField
                    fullWidth
                    inputRef={inputRef}
                    value={todo.title}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                    onKeyPress={handleKeyPress}
                    variant="standard"
                    sx={{ flexGrow: 1 }}
                />
            ) : (
                <ListItemText primary={todo.title} />
            )}
            <IconButton size="small" onClick={handleMenuOpen} sx={{border: "none"}}>
                <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <IconMenu onRename={handleRename} onDelete={() => {
                    onDeleteTodo(todo.id, true);
                }} />
            </Menu>
        </ListItemButton>
    );
};

export default DrawerItem;