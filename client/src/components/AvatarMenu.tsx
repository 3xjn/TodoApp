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

    console.log("anchorEl:", anchorEl);
    console.log("open:", open);

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
                    ></Avatar>
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorEl}
                    // modifiers={[
                    //     {
                    //         name: "offset",
                    //         options: {
                    //             offset: [-20, 0],
                    //         },
                    //     },
                    // ]}
                    sx={{
                        minWidth: "300px",
                    }}
                >
                    <Stack
                        flexDirection={"column"}
                        justifyContent={"center"}
                        sx={{
                            backgroundColor: getPalette(mode).background?.paper,
                            minWidth: {
                                xs: "100px",
                                sm: "150px",
                            },
                            borderRadius: "16px",
                        }}
                        padding={1}
                        spacing={1}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: "center",
                                fontSize: "0.75em",
                                padding: "10px"
                            }}
                        >
                            {authorizedUser?.email}
                        </Typography>
                        <Box
                            display="flex"
                            justifyContent="center"
                            width="100%"
                        >
                            <Avatar
                                src={authorizedUser?.picture_url}
                                alt="User Avatar"
                                sx={{
                                    width: "80px",
                                    height: "80px",
                                }}
                            ></Avatar>
                        </Box>
                        <Typography
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            Hi, {authorizedUser?.name}
                        </Typography>
                        <Divider></Divider>
                        <Button
                            onClick={handleLogout}
                            sx={{
                                borderRadius: "12px",
                            }}
                        >
                            Logout
                        </Button>
                    </Stack>
                </Popper>
            </Box>
        </ClickAwayListener>
    );
};

export { AvatarMenu };
