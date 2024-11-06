import React, { useCallback, useContext, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Stack, Divider, ToggleButtonGroup, Box } from "@mui/material";
import { toolbarGroups } from "@components/toolbarButtons";
import { ToolbarButton } from "@components/ToolbarButton";
import { ColorPickerToolbar } from "@components/ColorPickerToolbar";
import SaveStatusIndicator from "@components/SaveStatusIndicator";
import { TodosContext } from "@context/TodosContext";
import { editorExtensions } from "@utils/editorExtensions";
import { ITodoData } from "@services/api";

interface TiptapEditorProps {
    todo?: ITodoData;
    saveDebounce?: () => void;
    onChange?: () => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = React.memo(
    ({ todo, saveDebounce, onChange }) => {
        const editorContentRef = useRef<HTMLDivElement>(null);
        const { onUpdateTodo } = useContext(TodosContext)!;
        const [contentChanged, setContentChanged] = useState(false);

        const editor = useEditor({
            extensions: editorExtensions,
            content: todo?.content || "",
        });

        editor?.on("update", () => {
            setContentChanged(true);
            if (saveDebounce) saveDebounce();
            if (onChange) onChange();
        });

        const handleToolbarButtonClick = useCallback((command: () => void) => {
            command();
            editorContentRef.current?.focus();
        }, []);

        const handleSave = () => {
            if (!todo || !editor?.getHTML()) return;

            onUpdateTodo(
                todo.id,
                {
                    content: editor.getHTML(),
                },
                true
            );
            setContentChanged(false);
        };

        if (!editor) {
            return null;
        }

        return (
            <Stack
                sx={{
                    borderRadius: 1,
                    padding: 1,
                    maxWidth: "600px",
                }}
                alignItems="center"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={"space-evenly"}
                    spacing={2}
                    sx={{ marginBottom: 1, width: "100%", flexWrap: "wrap" }}
                >
                    {toolbarGroups.map((toolbarButtons) => (
                        <ToggleButtonGroup size="small">
                            {toolbarButtons.map((button) => (
                                <ToolbarButton
                                    key={button.value}
                                    {...button}
                                    editor={editor}
                                    icon={
                                        React.isValidElement(button.icon)
                                            ? button.icon
                                            : null
                                    }
                                    onClick={handleToolbarButtonClick}
                                />
                            ))}
                        </ToggleButtonGroup>
                    ))}
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            mx: { xs: 16, sm: 0 },
                            mr: { xs: 16, sm: 0 },
                            display: { xs: "none", sm: "none" },
                        }}
                    />
                    <ColorPickerToolbar editor={editor} />
                </Stack>
                <Box
                    sx={{
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        position: "relative",
                        width: "100%",
                        maxWidth: "600px",
                        maxHeight: "700px",
                        overflow: "auto",
                    }}
                >
                    <EditorContent
                        ref={editorContentRef}
                        editor={editor}
                        style={{
                            height: "100%",
                            overflow: "auto",
                        }}
                    />
                </Box>
                <SaveStatusIndicator
                    saveAction={handleSave}
                    contentChanged={contentChanged}
                />
            </Stack>
        );
    }
);
export default TiptapEditor;
