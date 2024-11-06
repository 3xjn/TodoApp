import { Drawer, Box } from "@mui/material";
import React from "react";
import { TodoList } from "./TodoList";

const drawerWidth = 240;

interface LeftNavbarProps {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isMobile: boolean;
}

export const LeftNavbar: React.FC<LeftNavbarProps> = ({
    drawerOpen,
    setDrawerOpen,
    isMobile,
}) => {
    return (
        <Box
            borderRight={1}
            borderColor="divider"
            height={"100%"}
            sx={{
                display: isMobile && !drawerOpen ? "none" : "initial",
                width: isMobile ? 0 : drawerWidth,
            }}
        >
            <Drawer
                container={document.body}
                variant={"temporary"}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    width: drawerWidth,
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                    },
                    backgroundImage: "none",
                }}
            >
                <TodoList setDrawerOpen={setDrawerOpen} />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                <TodoList setDrawerOpen={setDrawerOpen} />
            </Drawer>
        </Box>
    );
};
