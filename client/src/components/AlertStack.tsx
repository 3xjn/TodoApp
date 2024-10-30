import { Snackbar, Alert, Grid2 } from "@mui/material";
import { useTransition, animated } from "react-spring";
import { AlertContext } from "@context/AlertContext"; // Import your context hook
import { useContext } from "react";

export const AlertStack = () => {
    const { alerts } = useContext(AlertContext)!;

    const transitions = useTransition(alerts, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
        config: { tension: 180, friction: 15 },
        trail: 200,
    });

    return (
        <Snackbar
            open={alerts.length > 0}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Grid2 container flexDirection={"column"} spacing={0}>
                {transitions((style, item) => (
                    <animated.div key={item.id} style={{ ...style, padding: "8px 0" }}>
                        <Alert severity={item.severity}>{item.message}</Alert>
                    </animated.div>
                ))}
            </Grid2>
        </Snackbar>
    );
};