export const nameToColor = (name: string): string => {
    const cleanName = name.toUpperCase().replace(/\s+/g, "");

    // Create hash from name
    let hash = 0;
    for (let i = 0; i < cleanName.length; i++) {
        hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to HSL values
    // Hue: 0-360 degrees on the color wheel
    const hue = Math.abs(hash % 360);

    // Saturation: Keep it between 65-90% for vibrant but not overwhelming colors
    const saturation = 65 + Math.abs((hash >> 8) % 25);

    // Lightness: Keep it between 45-65% for visible but not too dark/light colors
    const lightness = 45 + Math.abs((hash >> 16) % 20);

    // Convert HSL to RGB
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    // Convert to hex
    const toHex = (c: number): string => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
