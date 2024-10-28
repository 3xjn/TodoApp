import React from "react";
import { ToggleButton, Tooltip } from "@mui/material";
import { Editor } from "@tiptap/react";

interface ToolbarButtonProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    isActive: (editor: Editor) => boolean;
    command: (editor: Editor) => void;
    editor: Editor;
    onClick: (command: () => void) => void;
    left?: boolean,
    right?: boolean
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    title,
    value,
    icon,
    isActive,
    command,
    editor,
    onClick,
    left,
    right
}) => (
    <Tooltip title={title} enterDelay={750} enterNextDelay={750}>
        <ToggleButton
            value={value}
            selected={isActive(editor)}
            onMouseDown={(e) => {
                e.preventDefault();
                onClick(() => command(editor));
            }}
            aria-label={value}
            size="small"
            sx={{
                borderTopLeft: left ? "none" : "0",
                borderBottomLeft: left ? "none" : "0",
                borderTopRightRadius: right ? "none" : "0",
                borderBottomRightRadius: right ? "none" : "0",
            }}
        >
            {icon}
        </ToggleButton>
    </Tooltip>
);