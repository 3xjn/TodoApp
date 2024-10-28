import React, { useState, useRef } from "react";
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

interface DrawerItemProps {
    todo: ITodoData;
    isSelected: boolean;
    onSelect: () => void;
    onUpdate: (updates: Partial<ITodoData>) => void;
    onDelete: () => void;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
    todo,
    isSelected,
    onSelect,
    onUpdate,
    onDelete,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleRename = () => {
        setIsEditing(true);
        setAnchorEl(null);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate({ title: event.target.value });
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            setIsEditing(false);
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
        <ListItemButton selected={isSelected} onClick={onSelect}>
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
                <IconMenu onRename={handleRename} onDelete={onDelete} />
            </Menu>
        </ListItemButton>
    );
};

export default DrawerItem;