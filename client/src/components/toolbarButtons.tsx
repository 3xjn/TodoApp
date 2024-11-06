import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { Editor } from "@tiptap/react";

export const toolbarGroups = [
    [
        {
            title: "Bold",
            value: "bold",
            icon: <FormatBoldIcon />,
            isActive: (editor: Editor) => editor.isActive("bold"),
            command: (editor: Editor) =>
                editor.chain().focus().toggleBold().run(),
            left: true,
        },
        {
            title: "Italic",
            value: "italic",
            icon: <FormatItalicIcon />,
            isActive: (editor: Editor) => editor.isActive("italic"),
            command: (editor: Editor) =>
                editor.chain().focus().toggleItalic().run(),
        },
        {
            title: "Underline",
            value: "underline",
            icon: <FormatUnderlinedIcon />,
            isActive: (editor: Editor) => editor.isActive("underline"),
            command: (editor: Editor) =>
                editor.chain().focus().toggleUnderline().run(),
        },
        {
            title: "Strikethrough",
            value: "strike",
            icon: <FormatStrikethroughIcon />,
            isActive: (editor: Editor) => editor.isActive("strike"),
            command: (editor: Editor) =>
                editor.chain().focus().toggleStrike().run(),
            right: true,
        },
    ],
    [
        {
            title: "Task list",
            value: "task-list",
            icon: <ChecklistIcon />,
            isActive: (editor: Editor) => editor.isActive("taskList"),
            command: (editor: Editor) =>
                editor.chain().focus().toggleTaskList().run(),
        },
        {
            title: "Bullet list",
            value: "bullet-list",
            icon: <FormatListBulletedIcon />,
            isActive: (editor: Editor) => editor.isActive("bulletList"),
            command: (editor: Editor) =>
                editor.chain().focus().toggleBulletList().run(),
        },
        {
            title: "Number list",
            value: "number-list",
            icon: <FormatListNumberedIcon />,
            isActive: (editor: Editor) => editor.isActive("orderedList"),
            command: (editor: Editor) =>
                editor.chain().focus().toggleOrderedList().run(),
        },
        {
            title: "Align left",
            value: "align-left",
            icon: <FormatAlignLeftIcon />,
            isActive: (editor: Editor) =>
                editor.isActive({ textAlign: "left" }),
            command: (editor: Editor) =>
                editor.chain().focus().setTextAlign("left").run(),
        },
        {
            title: "Align center",
            value: "align-center",
            icon: <FormatAlignCenterIcon />,
            isActive: (editor: Editor) =>
                editor.isActive({ textAlign: "center" }),
            command: (editor: Editor) => {
                if (editor.isActive({ textAlign: "center" })) {
                    editor.commands.setTextAlign("left");
                    return;
                }
                editor.commands.setTextAlign("center");
            },
        },
        {
            title: "Align right",
            value: "align-right",
            icon: <FormatAlignRightIcon />,
            isActive: (editor: Editor) =>
                editor.isActive({ textAlign: "right" }),
            command: (editor: Editor) => {
                if (editor.isActive({ textAlign: "right" })) {
                    editor.commands.setTextAlign("left");
                    return;
                }
                editor.commands.setTextAlign("right");
            },
        },
        {
            title: "Justify",
            value: "align-justify",
            icon: <FormatAlignJustifyIcon />,
            isActive: (editor: Editor) =>
                editor.isActive({ textAlign: "justify" }),
            command: (editor: Editor) => {
                if (editor.isActive({ textAlign: "justify" })) {
                    editor.commands.setTextAlign("left");
                    return;
                }
                editor.commands.setTextAlign("justify");
            },
            right: true
        },
    ],
];
