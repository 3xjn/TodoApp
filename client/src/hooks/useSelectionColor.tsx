import { Editor } from "@tiptap/core";
import { useMemo } from "react";

export const useSelectionColor = (editor: Editor) => {
    return useMemo(() => {
        const { selection, doc } = editor.state;

        if (selection.empty) {
            return editor.getAttributes("textStyle").color;
        }

        const { from, to } = selection;
        let firstColor: string | undefined = undefined;

        doc.nodesBetween(from, to, (node) => {
            if (node.type.name === "text") {
                const textStyleMark = node.marks.find(
                    (mark) => mark.type.name === "textStyle"
                );
                const color = textStyleMark?.attrs?.color;

                if (color) {
                    if (firstColor === undefined) {
                        firstColor = color;
                    } else if (firstColor !== color) {
                        firstColor = undefined;
                        return false;
                    }
                }
            }
        });

        return firstColor;
    }, [editor.state.selection, editor.state.doc]);
};
