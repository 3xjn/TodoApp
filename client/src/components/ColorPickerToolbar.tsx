import { Box, IconButton, Popover } from "@mui/material";
import CustomCirclePicker from "@components/CustomCirclePicker";
import { ColorResult } from "react-color"; // Note: Keep ColorResult since it represents the color selected in the picker
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Editor } from "@tiptap/core";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import { getAllTextColors } from "@utils/getAllTextColors";

interface ColorPickerToolbarProps {
    editor: Editor;
}

export const ColorPickerToolbar: React.FC<ColorPickerToolbarProps> = ({
    editor,
}) => {
    const [colorPickerAnchor, setColorPickerAnchor] =
        useState<null | HTMLElement>(null);
    const [currentColor, setCurrentColor] = useState<string | undefined>(
        undefined
    );

    const handleColorChange = useCallback(
        (color: ColorResult) => {
            setCurrentColor(color.hex); // Assuming color.hex is a string
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

    const state = editor.state;

    const color = useMemo(() => {
        return getAllTextColors(state.selection, state.doc); // This returns string | undefined
    }, [state.selection, state.doc]);

    useEffect(() => {
        if (color) {
            setCurrentColor(color);
        } else {
            setCurrentColor(undefined);
        }
    }, [color]);

    const colorPickerOpen = Boolean(colorPickerAnchor);

    return (
        <Box>
            <IconButton onClick={handleColorPickerOpen} size="medium">
                <FormatColorTextIcon
                    sx={{
                        color: currentColor ? currentColor : "inherit",
                    }}
                />
            </IconButton>
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
                    onClear={() => {
                        editor.commands.unsetMark("textStyle");
                        setCurrentColor(undefined);
                    }}
                />
            </Popover>
        </Box>
    );
};
