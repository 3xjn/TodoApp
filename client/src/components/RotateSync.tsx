import React, { useState } from "react";
import { SvgIcon, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { animated, useSpring, easings } from "react-spring";

// Generic type for MUI icons
type IconType = OverridableComponent<SvgIconTypeMap<object, "svg">>;

interface RotateSyncProps {
    icon: IconType; // The icon component
    iconProps?: React.ComponentProps<typeof SvgIcon>; // Props to pass to the icon
    duration?: number; // Optional prop for animation duration
}

const AnimatedIcon = animated(SvgIcon);

export const RotateSync: React.FC<RotateSyncProps> = ({
    icon: IconComponent,
    iconProps = {}, // Default to empty object to avoid undefined issues
    duration = 1500, // Default duration for rotation
}) => {
    const [paused, setPaused] = useState(false);

    // Define the spring animation for rotation
    const { rotate } = useSpring({
        from: { rotate: 0 },
        to: { rotate: paused ? 0 : 0.5 },
        config: {
            duration,
            easing: easings.easeInOutExpo,
        },
        loop: !paused,
        onRest: () => {
            if (!paused) {
                setPaused(true);
                setTimeout(() => {
                    setPaused(false);
                }, 20);
            }
        },
    });

    return (
        <AnimatedIcon
            style={{
                display: "inline-block",
                transform: rotate.to((r) => `rotate(${r * 360}deg)`), // Rotate based on spring value
            }}
        >
            <IconComponent {...iconProps} /> {/* Pass iconProps to the icon */}
        </AnimatedIcon>
    );
};