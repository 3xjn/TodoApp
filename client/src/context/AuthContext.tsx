import { getProfilePicture } from "@root/services/api";
import { validateToken } from "@root/services/authService";
import React, { useState, useEffect } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    profileUrl: string;
    setProfileUrl: React.Dispatch<React.SetStateAction<string>>
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileUrl, setProfileUrl] = useState("");

    useEffect(() => {
        const checkAuthToken = async () => {
            const authToken = sessionStorage.getItem("authToken");
            if (!authToken) return setIsAuthenticated(false);
            const isValid = await validateToken(authToken);
            setIsAuthenticated(isValid);
            setProfileUrl(await getProfilePicture())
        };
        checkAuthToken();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, profileUrl, setProfileUrl }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };