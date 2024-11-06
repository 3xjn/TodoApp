import React, { useState } from "react";
import { SvgIcon, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { animated, useSpring, easings } from "react-spring";

type IconType = OverridableComponent<SvgIconTypeMap<object, "svg">>;

interface RotateSyncProps {
    icon: IconType;
    iconProps?: React.ComponentProps<typeof SvgIcon>;
    duration?: number;
}

const AnimatedIcon = animated(SvgIcon);

export const RotateSync: React.FC<RotateSyncProps> = ({
    icon: IconComponent,
    iconProps = {},
    duration = 1500,
}) => {
    const [paused, setPaused] = useState(false);

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
                transform: rotate.to((r) => `rotate(${r * 360}deg)`),
            }}
        >
            <IconComponent {...iconProps} />
        </AnimatedIcon>
    );
};