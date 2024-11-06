import React, { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import SyncIcon from "@mui/icons-material/Sync";
import { RotateSync } from "@components/RotateSync";
import { useSpring, animated } from "react-spring";
import { useDebounce } from "@hooks/useDebounce";

interface SaveStatusIndicatorProps {
    saveAction: () => void;
    debounceTime?: number;
    contentChanged: boolean;
}

const SaveStatusIndicator: React.FC<SaveStatusIndicatorProps> = ({
    saveAction,
    debounceTime = 2500,
    contentChanged,
}) => {
    const [saved, setSaved] = useState(true);
    const [visible, setVisible] = useState(false);

    const saveDebounce = useDebounce(() => {
        saveAction();
        setSaved(true);
        setVisible(true);

        setTimeout(() => {
            setVisible(false);
        }, 2000);
    }, debounceTime);

    useEffect(() => {
        if (contentChanged) {
            setSaved(false);
            setVisible(true);
            saveDebounce();
        }
    }, [contentChanged, saveDebounce]);

    const fade = useSpring({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-10px)",
        config: { tension: 250, friction: 20 },
    });

    return (
        <>
            <animated.div style={fade}>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ marginTop: "10px" }}
                >
                    {saved ? (
                        <CloudDoneIcon sx={{ color: "success.main", fontSize: 24 }} />
                    ) : (
                        <RotateSync
                            icon={SyncIcon}
                            iconProps={{
                                sx: { color: "warning.main", fontSize: 24 },
                            }}
                        />
                    )}
                    <Typography
                        sx={{
                            fontSize: "14px",
                            userSelect: "none",
                            ml: 1,
                            fontWeight: "bold",
                            color: saved ? "success.main" : "warning.main",
                            transition: "color 0.3s ease-in-out",
                        }}
                    >
                        {saved ? "Saved" : "Saving"}
                    </Typography>
                </Stack>
            </animated.div>
        </>
    );
};

export default SaveStatusIndicator;