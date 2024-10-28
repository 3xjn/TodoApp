import React from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface IconMenuProps {
    onRename: () => void;
    onDelete: () => void;
}

const IconMenu: React.FC<IconMenuProps> = ({ onRename, onDelete }) => {
    return (
        <>
            <MenuItem onClick={onRename}>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText>Rename</ListItemText>
            </MenuItem>
            <MenuItem onClick={onDelete}>
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        </>
    );
};

export default IconMenu;