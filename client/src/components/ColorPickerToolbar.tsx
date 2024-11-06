import { styled } from "@mui/material/styles";
import { Box, IconButton, Popover } from "@mui/material";
import CustomCirclePicker from "@components/CustomCirclePicker";
import { ColorResult } from "react-color";
import React, { useCallback, useState } from "react";
import { Editor } from "@tiptap/core";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import { useSelectionColor } from "@root/hooks/useSelectionColor";

const OutlinedIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 6,
    "&.Mui-selected": {
        backgroundColor: theme.palette.action.selected,
        color: theme.palette.primary.main,
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}));

interface ColorPickerToolbarProps {
    editor: Editor;
}

export const ColorPickerToolbar: React.FC<ColorPickerToolbarProps> = ({
    editor,
}) => {
    const [colorPickerAnchor, setColorPickerAnchor] =
        useState<null | HTMLElement>(null);
    
    const currentColor = useSelectionColor(editor);

    const handleColorChange = useCallback(
        (color: ColorResult) => {
            editor?.chain().focus().setColor(color.hex).run();
            setColorPickerAnchor(null);
        },
        [editor]
    );

    const handleColorPickerOpen = (event: React.MouseEvent<HTMLElement>) => {
        setColorPickerAnchor(event.currentTarget);
    };

    const handleColorPickerClose = () => {
        setColorPickerAnchor(null);
    };

    const handleClear = useCallback(() => {
        editor.commands.unsetMark("textStyle");
    }, [editor]);

    const colorPickerOpen = Boolean(colorPickerAnchor);

    return (
        <Box>
            <OutlinedIconButton onClick={handleColorPickerOpen} size="medium">
                <FormatColorTextIcon
                    sx={{
                        color: currentColor ? currentColor : "inherit",
                    }}
                />
            </OutlinedIconButton>
            <Popover
                open={colorPickerOpen}
                anchorEl={colorPickerAnchor}
                onClose={handleColorPickerClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                slotProps={{
                    paper: {
                        sx: {
                            p: 1,
                            width: 320,
                        },
                    },
                }}
            >
                <CustomCirclePicker
                    color={currentColor}
                    onChangeComplete={handleColorChange}
                    onClear={handleClear}
                />
            </Popover>
        </Box>
    );
};
