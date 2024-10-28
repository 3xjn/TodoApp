import { EditorState } from "@tiptap/pm/state";

// Explicitly define the return type as `string | undefined`
export function getAllTextColors(selection: EditorState["selection"], doc: EditorState["doc"]): string | undefined {
    const { from, to } = selection;
    let firstColor: string | undefined = undefined; // Initially undefined

    // Traverse the document and check nodes between 'from' and 'to'
    doc.nodesBetween(from, to, (node) => {
        if (node.type.name === "text") {
            const textStyleMark = node.marks.find(
                (mark) => mark.type.name === "textStyle"
            );
            const color = textStyleMark?.attrs?.color;

            if (color) {
                if (firstColor === undefined) {
                    firstColor = color; // Store the first color encountered
                } else if (firstColor !== color) {
                    firstColor = undefined; // If different color, set undefined and stop
                    return false; // Stop iterating
                }
            }
        }
    });

    return firstColor; // Return either a single color or undefined
}