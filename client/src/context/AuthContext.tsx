import { getProfilePicture } from "@root/services/api";
import { validateToken } from "@root/services/authService";
import React, { useState, useEffect } from "react";
import { useAlert } from "@context/AlertContext";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    profileUrl: string;
    setProfileUrl: React.Dispatch<React.SetStateAction<string>>;
    hasChecked: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { addAlert } = useAlert();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileUrl, setProfileUrl] = useState("");
    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        const checkAuthToken = async () => {
            const authToken = sessionStorage.getItem("authToken");
            if (!authToken) {
                setIsAuthenticated(false);
                setHasChecked(true);
                return
            }

            const isValid = await validateToken(authToken);
            setIsAuthenticated(isValid);

            if (isValid) {
                setProfileUrl(await getProfilePicture());
            } else {
                addAlert("Failed to validate token", "error");
            }

            setHasChecked(true);
        };
        checkAuthToken();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                profileUrl,
                setProfileUrl,
                hasChecked,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
