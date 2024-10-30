import React, { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import SyncIcon from "@mui/icons-material/Sync";
import { RotateSync } from "@components/RotateSync"; // Reuse your existing rotating sync icon component
import { useSpring, animated } from "react-spring"; // For animations
import { useDebounce } from "@root/hooks/useDebounce"; // Reuse the existing debounce function

interface SaveStatusIndicatorProps {
    saveAction: () => void; // Function that performs the save action
    debounceTime?: number;  // Optional debounce time in ms (default: 3000)
    contentChanged: boolean; // Tracks whether content has changed
}

const SaveStatusIndicator: React.FC<SaveStatusIndicatorProps> = ({
    saveAction,
    debounceTime = 3000,
    contentChanged,
}) => {
    const [saved, setSaved] = useState(true);
    const [visible, setVisible] = useState(false);

    // Debounced save function
    const saveDebounce = useDebounce(() => {
        saveAction();
        setSaved(true);
        setVisible(true);

        // Hide the "Saved" message after a few seconds
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    }, debounceTime);

    // Trigger the debounced save when content changes
    useEffect(() => {
        if (contentChanged) {
            setSaved(false);
            setVisible(true);
            saveDebounce(); // Call the debounced save action when content changes
        }
    }, [contentChanged, saveDebounce]);

    // React-Spring animation configuration
    const fade = useSpring({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-10px)", // Slide effect
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