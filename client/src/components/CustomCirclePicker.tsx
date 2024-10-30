import React from "react";
import { CirclePicker, Color, ColorResult } from "react-color";
import { styled } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";

const StyledCirclePicker = styled(CirclePicker)(({ theme }) => ({
    "&.circle-picker": {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "100% !important",
        gap: theme.spacing(0.5),
        justifyContent: "flex-start",
        backgroundColor: "inherit"
    },
    "& > span > div": {
        margin: "0 !important",
    },
    "& > span > div > span > div": {
        width: "28px !important",
        height: "28px !important",
        borderRadius: "50% !important",
        border: `1px solid ${theme.palette.divider} !important`,
    },
}));

interface CustomCirclePickerProps {
    color: Color | undefined;
    onChangeComplete: (color: ColorResult) => void;
    onClear: () => void; // New prop for clearing color
}

const CustomCirclePicker: React.FC<CustomCirclePickerProps> = ({
    color,
    onChangeComplete,
    onClear, // Destructure new prop
}) => {
    const colors = [
        "#000000",
        "#FFFFFF",
        "#FF6900",
        "#FCB900",
        "#7BDCB5",
        "#00D084",
        "#8ED1FC",
        "#0693E3",
        "#ABB8C3",
        "#EB144C",
        "#F78DA7",
        "#9900EF",
        "#1ABC9C",
        "#2ECC71",
        "#3498DB",
        "#9B59B6",
        "#E74C3C",
        "#34495E",
        "#16A085",
        "#27AE60",
        "#2980B9",
        "#8E44AD",
        "#C0392B",
        "#2C3E50",
        "#F1C40F",
        "#E67E22",
        "#E74C3C",
        "#ECF0F1",
        "#95A5A6",
        "#7F8C8D",
    ];

    return (
        <Stack spacing={2}>
            <StyledCirclePicker
                color={color}
                onChangeComplete={onChangeComplete}
                colors={colors}
                width="100%"
            />
            <Button onClick={onClear} color="primary">
                Clear Color
            </Button>
        </Stack>
    );
};

export default CustomCirclePicker;
