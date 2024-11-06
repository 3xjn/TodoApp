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

const lightPalette: CustomPalette = {
    primary: {
        main: "#2D3648", // Rich navy blue - more corporate and professional
        light: "#4A5875",
        dark: "#1A2133",
    },
    secondary: {
        main: "#636E8C", // Muted blue-grey for secondary elements
        light: "#8690A6",
        dark: "#4A5266",
    },
    background: {
        default: "#F8F9FB", // Slightly warmer than pure white
        paper: "#FFFFFF",
    },
    text: {
        primary: "#1C2025", // Softer than pure black
        secondary: "#4B5563", // Balanced grey for better readability
    },
    error: {
        main: "#DC3545", // Refined red
    },
    warning: {
        main: "#F59E0B", // Warm amber
    },
    info: {
        main: "#3B82F6", // Clear blue
    },
    success: {
        main: "#10B981", // Professional green
    },
    custom: {
        selectionBackground: "#E2E8F0",
        selectionText: "#2D3648",
        border: "#E5E7EB",
        shadow: "rgba(17, 24, 39, 0.05)",
        inputHoverBorder: "#CBD5E1",
        placeholderText: "#94A3B8",
        checkboxBorder: "#CBD5E1",
        toggleButtonBackground: "#F1F5F9",
        toggleButtonBackgroundHover: "#E2E8F0",
    },
};

const getPalette = (mode: PaletteMode): CustomPalette => {
    return mode === "light" ? lightPalette : modernTechPalette;
};

const getTheme = (mode: PaletteMode): Theme =>
    createTheme({
        palette: {
            ...getPalette(mode),
            mode,
        },
        typography: {
            fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            h1: {
                fontSize: "2.25rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
            },
            h2: {
                fontSize: "1.875rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
            },
            h3: {
                fontSize: "1.5rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: 1.375,
            },
            body1: {
                fontSize: "1rem",
                lineHeight: 1.6,
                letterSpacing: "0.00938em",
            },
            button: {
                fontWeight: 600,
                letterSpacing: "0.01em",
            },
        },
        shape: {
            borderRadius: 6,
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: getPalette(mode).background?.default,
                        color: getPalette(mode).text?.primary,
                        transition: "background-color 0.2s ease-in-out",
                    },
                    "::selection": {
                        backgroundColor:
                            getPalette(mode).custom.selectionBackground,
                        color: getPalette(mode).custom.selectionText,
                    },
                    ".tiptap": {
                        border: `1px solid ${getPalette(mode).custom.border}`,
                        borderRadius: "6px",
                        padding: "16px",
                        width: "100%",
                        maxWidth: "700px",
                        margin: "0 auto",
                        boxShadow: `0 2px 4px ${
                            getPalette(mode).custom.shadow
                        }`,
                        backgroundColor: getPalette(mode).background?.paper,
                        transition: "all 0.2s ease-in-out",
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
                        textTransform: "none",
                        fontWeight: 600,
                        padding: "8px 20px",
                        transition: "all 0.2s ease-in-out",
                    },
                    contained: {
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: `0 4px 8px ${
                                getPalette(mode).custom.shadow
                            }`,
                            transform: "translateY(-1px)",
                        },
                    },
                    outlined: {
                        borderWidth: "1.5px",
                        "&:hover": {
                            borderWidth: "1.5px",
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                                backgroundColor:
                                    mode === "light"
                                        ? "rgba(0, 0, 0, 0.01)"
                                        : "rgba(255, 255, 255, 0.01)",
                            },
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: `0 4px 12px ${
                            getPalette(mode).custom.shadow
                        }`,
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: `0 6px 16px ${
                                getPalette(mode).custom.shadow
                            }`,
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            backgroundColor:
                                mode === "light"
                                    ? "rgba(0, 0, 0, 0.04)"
                                    : "rgba(255, 255, 255, 0.04)",
                            transform: "scale(1.05)",
                        },
                    },
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    img: {
                        pointerEvents: "none"
                    }
                }
            }
        },
    });

const lightTheme = getTheme("light");
const darkTheme = getTheme("dark");

export { lightTheme, darkTheme, getTheme, getPalette };
