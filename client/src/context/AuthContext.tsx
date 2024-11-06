import { DecodedJWT, JWTClaims } from "@root/utils/JwtClaims";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

interface User {
    name: string;
    name_id: string;
    picture_url: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    // setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    handleLogout: () => void;
    handleLogin: (token: string) => void;
    authorizedUser: User | undefined;
    // setAuthorizedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    // fetchAuthorizedUser: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [authorizedUser, setAuthorizedUser] = useState<User | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(cookies.get("authToken")));

    useEffect(() => {
        if (isAuthenticated && !authorizedUser) {
            const decodedJWT = jwtDecode<DecodedJWT>(cookies.get("authToken"));
            const user = {
                name: decodedJWT[JWTClaims.Name],
                name_id: decodedJWT.sub,
                picture_url: decodedJWT[JWTClaims.PictureUrl],
                email: decodedJWT[JWTClaims.EmailAddress],
            };
            setAuthorizedUser(user);
        }
    }, [isAuthenticated, authorizedUser]);

    const handleLogin = useCallback((token: string) => {
        const decodedJWT = jwtDecode<DecodedJWT>(token);
        const expirationDate = decodedJWT.exp
            ? new Date(decodedJWT.exp * 1000)
            : new Date(Date.now() + 3600000);

        cookies.set("authToken", token, {
            expires: expirationDate,
            sameSite: "strict",
        });

        setIsAuthenticated(true);
    }, []);

    const handleLogout = useCallback(() => {
        cookies.remove("authToken");
        setIsAuthenticated(false);
        setAuthorizedUser(undefined);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authorizedUser,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
