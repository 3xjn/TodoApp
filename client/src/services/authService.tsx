export const validateToken = async (token: string): Promise<boolean> => {
    try {
        const response = await fetch("/auth/validate-token", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return response.json();
        }

        return false;
    } catch (error) {
        console.error("Token validation failed", error);
        return false;
    }
};
