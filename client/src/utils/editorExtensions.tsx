import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import TabHandler from "./TabHandler";
import TextStyle from "@tiptap/extension-text-style";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";

export const editorExtensions = [
    Document,
    Paragraph,
    Text,
    Bold,
    Italic,
    Strike,
    Underline,
    TaskList,
    TaskItem.configure({ nested: true }),
    BulletList,
    OrderedList,
    ListItem,
    TabHandler,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    History.configure({ newGroupDelay: 1, depth: 1000 }),
    Placeholder.configure({ placeholder: "Write something ..." }),
    Color,
    TextStyle,
    Dropcursor,
    Image,
    Highlight,
];
