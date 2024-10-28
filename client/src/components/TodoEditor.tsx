import React from "react";
import { Box, Grid2 } from "@mui/material";
import { ITodoData } from "@services/api";
import TiptapEditor from "./TiptapEditor";

interface TodoEditorProps {
    todo?: ITodoData;
}

const TodoEditor: React.FC<TodoEditorProps> = ({ todo }) => {
    return (
        <Grid2
            container
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-evenly"}
            sx={{
                width: "100%"
            }}
        >
            <Box>
                <TiptapEditor todo={todo} />
            </Box>
        </Grid2>
    );
};

export default React.memo(TodoEditor);
