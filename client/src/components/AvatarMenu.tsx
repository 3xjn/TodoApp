import {
    Popper,
    Stack,
    Typography,
    Button,
    Avatar,
    IconButton,
    Box,
    ClickAwayListener,
    useMediaQuery,
    Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "@root/context/AuthContext";
import { ThemeContext } from "@root/context/ThemeContext";
import { getPalette } from "@root/styles/theme";
import { nameToColor } from "@root/utils/nameToColor";
import React, { useContext, useState } from "react";

const AvatarMenu: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);

    const { handleLogout, authorizedUser } = useContext(AuthContext)!;
    const { mode } = useContext(ThemeContext)!;

    const toggleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(open ? null : event.currentTarget);
        setOpen(!open);
    };

    const getProfileLetters = (name: string) => {
        const split = name.split(" ");
        return split.length > 1
            ? `${split[0][0].toUpperCase()}${split[1][0].toUpperCase()}`
            : `${name[0].toUpperCase()}`;
    };

    const name = authorizedUser ? getProfileLetters(authorizedUser.name) : "";

    return (
        <ClickAwayListener
            onClickAway={() => {
                setOpen(false);
            }}
        >
            <Box>
                <IconButton
                    onClick={toggleClick}
                    size={isMobile ? "small" : "medium"}
                >
                    <Avatar
                        src={authorizedUser?.picture_url}
                        alt="User Avatar"
                        sx={{
                            bgcolor: nameToColor(name),
                            width: isMobile ? 32 : 40,
                            height: isMobile ? 32 : 40,
                            fontSize: isMobile ? "1rem" : "1.25rem",
                            transition: "all 0.1s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                    >
                        {name}
                    </Avatar>
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorEl}
                    placement="bottom-end"
                    sx={{
                        zIndex: theme.zIndex.modal,
                        mt: 1,
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                    }}
                >
                    <Stack
                        sx={{
                            backgroundColor: getPalette(mode).background?.paper,
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.divider}`,
                            minWidth: {
                                xs: "280px",
                                sm: "320px",
                            },
                            overflow: "hidden",
                        }}
                        padding={2}
                    >
                        <Box sx={{ p: 3, textAlign: "center" }}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                                mb={2}
                            >
                                <Avatar
                                    src={authorizedUser?.picture_url}
                                    alt="User Avatar"
                                    sx={{
                                        width: 96,
                                        height: 96,
                                        bgcolor: nameToColor(name),
                                        fontSize: "2.5rem",
                                        border: `2px solid ${theme.palette.background.paper}`,
                                        boxShadow: theme.shadows[2],
                                        transition:
                                            "transform 0.2s ease-in-out",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                >
                                    {name}
                                </Avatar>
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 500,
                                    mb: 0.5,
                                }}
                            >
                                {authorizedUser?.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: "block",
                                    mb: 1,
                                }}
                            >
                                {authorizedUser?.email}
                            </Typography>
                        </Box>

                        <Divider />

                        <Box sx={{ p: 2 }}>
                            <Button
                                onClick={handleLogout}
                                variant="outlined"
                                fullWidth
                            >
                                Sign Out
                            </Button>
                        </Box>
                    </Stack>
                </Popper>
            </Box>
        </ClickAwayListener>
    );
};

export { AvatarMenu };
