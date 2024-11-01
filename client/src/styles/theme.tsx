import {
    createTheme,
    Theme,
    PaletteMode,
    PaletteOptions,
} from "@mui/material/styles";
import { modernTechPalette } from "./themes/theme1";
export interface CustomPalette extends PaletteOptions {
    primary: {
        main: string;
        light: string;
        dark: string;
    };
    custom: {
        selectionBackground: string;
        selectionText: string;
        border: string;
        shadow: string;
        inputHoverBorder: string;
        placeholderText: string;
        checkboxBorder: string;
        toggleButtonBackground: string;
        toggleButtonBackgroundHover: string;
    };
}

// Define light and dark palettes using the CustomPalette type
const lightPalette: CustomPalette = {
    primary: {
        main: "#4A90E2",
        light: "#68A5E9",
        dark: "#3A78C2",
    },
    secondary: {
        main: "#F5A623",
        light: "#F7B946",
        dark: "#D48C1F",
    },
    background: {
        default: "#F4F5F7",
        paper: "#FFFFFF",
    },
    text: {
        primary: "#333333",
        secondary: "#666666",
    },
    error: {
        main: "#F44336",
    },
    warning: {
        main: "#FF9800",
    },
    info: {
        main: "#2196F3",
    },
    success: {
        main: "#4CAF50",
    },
    custom: {
        selectionBackground: "#68A5E9",
        selectionText: "#FFFFFF",
        border: "#E0E0E0",
        shadow: "rgba(0, 0, 0, 0.05)",
        inputHoverBorder: "#B3B3B3",
        placeholderText: "#9CA3AF",
        checkboxBorder: "#CBD5E0",
        toggleButtonBackground: "#E8F1FC",
        toggleButtonBackgroundHover: "#D1E4FA",
    },
};

// const darkPalette: CustomPalette = {
//     primary: {
//         main: "#FF5733",
//         light: "#FF8D6B",
//         dark: "#C70039",
//     },
//     secondary: {
//         main: "#FFC300",
//         light: "#FFD700",
//         dark: "#B8860B",
//     },
//     background: {
//         default: "#1A1A1A",
//         paper: "#2C2C2C",
//     },
//     text: {
//         primary: "#FFFFFF",
//         secondary: "#FFC300",
//     },
//     error: {
//         main: "#F44336",
//     },
//     warning: {
//         main: "#FF9800",
//     },
//     info: {
//         main: "#2196F3",
//     },
//     success: {
//         main: "#4CAF50",
//     },
//     custom: {
//         selectionBackground: "#4A90E2",
//         selectionText: "#FFFFFF",
//         border: "#4A5568",
//         shadow: "rgba(0, 0, 0, 0.15)",
//         inputHoverBorder: "#718096",
//         placeholderText: "#718096",
//         checkboxBorder: "#4A5568",
//         toggleButtonBackground: "#2C5282",
//         toggleButtonBackgroundHover: "#2B4C7E",
//     },
// };

const darkPalette = modernTechPalette;

// Function to get the correct palette based on the mode
const getPalette = (mode: PaletteMode): CustomPalette => {
    return mode === "light" ? lightPalette : darkPalette;
};

const getTheme = (mode: PaletteMode): Theme =>
    createTheme({
        palette: {
            ...getPalette(mode),
        },
        typography: {
            fontFamily: '"Helvetica", "Arial", sans-serif',
            h1: {
                fontSize: "2rem",
                fontWeight: 600,
                letterSpacing: "-0.01562em",
            },
            h2: {
                fontSize: "1.75rem",
                fontWeight: 600,
                letterSpacing: "-0.00833em",
            },
            body1: {
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: "0.00938em",
            },
        },
        shape: {
            borderRadius: 8,
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: getPalette(mode).background?.default,
                        color: getPalette(mode).text?.secondary,
                    },
                    "::selection": {
                        backgroundColor:
                            getPalette(mode).custom.selectionBackground,
                        color: getPalette(mode).custom.selectionText,
                    },
                    ".tiptap": {
                        border: `1px solid ${getPalette(mode).custom.border}`,
                        borderRadius: "8px",
                        padding: "12px",
                        width: "100%",
                        maxWidth: "600px",
                        margin: "0 auto",
                        boxShadow: `0 2px 4px ${
                            getPalette(mode).custom.shadow
                        }`,
                        backgroundColor: getPalette(mode).background?.paper,
                        fontFamily:
                            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
                        lineHeight: 1.6,
                        transition:
                            "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                        color: getPalette(mode).text?.primary,
                        "&:focus-within": {
                            borderColor: getPalette(mode).primary?.main,
                            boxShadow: `0 0 0 3px ${
                                mode === "light"
                                    ? "rgba(74, 144, 226, 0.1)"
                                    : "rgba(104, 165, 233, 0.2)"
                            }`,
                        },
                    },
                    ".ProseMirror": {
                        outline: "none",
                        color: getPalette(mode).text?.primary,
                        "& p": {
                            color: getPalette(mode).text?.primary,
                            margin: "0 0 0.5em 0",
                            "&:last-child": {
                                marginBottom: 0,
                            },
                            "&.is-editor-empty:first-child::before": {
                                content: "attr(data-placeholder)",
                                float: "left",
                                color: getPalette(mode).custom.placeholderText,
                                pointerEvents: "none",
                                height: 0,
                            },
                        },
                    },
                    '.tiptap ul[data-type="taskList"]': {
                        listStyle: "none",
                        padding: 0,
                        "& li": {
                            display: "flex",
                            alignItems: "flex-start",
                            marginBottom: "0.5em",
                            "& > label": {
                                flexShrink: 0,
                                marginRight: "0.5em",
                                userSelect: "none",
                            },
                            "& > div": {
                                flex: 1,
                                minHeight: "1.5em",
                                display: "flex",
                                alignItems: "center",
                                "& > p": {
                                    margin: 0,
                                    width: "100%",
                                },
                            },
                        },
                        '& input[type="checkbox"]': {
                            appearance: "none",
                            width: "18px",
                            height: "18px",
                            border: `2px solid ${
                                getPalette(mode).custom.checkboxBorder
                            }`,
                            borderRadius: "4px",
                            margin: 0,
                            cursor: "pointer",
                            transition: "all 0.2s ease-in-out",
                            "&:checked": {
                                backgroundColor: getPalette(mode).primary?.main,
                                borderColor: getPalette(mode).primary?.main,
                                "&::after": {
                                    content: '""',
                                    display: "block",
                                    width: "5px",
                                    height: "10px",
                                    border: "solid white",
                                    borderWidth: "0 2px 2px 0",
                                    transform: "rotate(45deg)",
                                    margin: "1px 0 0 5px",
                                },
                            },
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                        textTransform: "none",
                        fontWeight: 600,
                        padding: "6px 16px",
                    },
                    contained: {
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: `0px 2px 4px ${
                                getPalette(mode).custom.shadow
                            }`,
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 6,
                            "& fieldset": {
                                borderColor: getPalette(mode).custom.border,
                            },
                            "&:hover fieldset": {
                                borderColor:
                                    getPalette(mode).custom.inputHoverBorder,
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: getPalette(mode).primary?.main,
                            },
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: `0px 2px 4px ${
                            getPalette(mode).custom.shadow
                        }`,
                        borderRadius: 8,
                    },
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: {
                        color: getPalette(mode).text?.secondary,
                        border: `1px solid ${getPalette(mode).custom.border}`,
                        borderRadius: 6,

                        "&.Mui-selected": {
                            backgroundColor:
                                getPalette(mode).custom.toggleButtonBackground,
                            color: getPalette(mode).primary?.main,
                            "&:hover": {
                                backgroundColor:
                                    getPalette(mode).custom
                                        .toggleButtonBackgroundHover,
                            },
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color:
                            mode === "light" ? "rgba(0, 0, 0, 0.54)" : "white",
                        "&.Mui-selected": {
                            backgroundColor:
                                getPalette(mode).custom.toggleButtonBackground,
                            color: getPalette(mode).primary?.main,
                        },
                    },
                },
            },
            MuiStack: {
                styleOverrides: {
                    root: {
                        backgroundColor: getPalette(mode).background?.default,
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        color: getPalette(mode).text?.primary,
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        color: getPalette(mode).text?.primary,
                    },
                },
            }
        },
    });

// Create light and dark themes
const lightTheme = getTheme("light");
const darkTheme = getTheme("dark");

export { lightTheme, darkTheme, getTheme, getPalette };