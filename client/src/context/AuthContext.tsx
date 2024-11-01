import { DecodedJWT, JWTClaims } from "@root/utils/JwtClaims";
import React, { useState } from "react";
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
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    handleLogout: () => void;
    authorizedUser: User | undefined;
    setAuthorizedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    fetchAuthorizedUser: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [authorizedUser, setAuthorizedUser] = useState<User | undefined>(
        undefined
    );

    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(cookies.get("authToken"))
    );

    const handleLogout = () => {
        cookies.remove("authToken");
        setIsAuthenticated(false);
        setAuthorizedUser(undefined);
    };

    const fetchAuthorizedUser = () => {
        if (isAuthenticated) {
            const decodedJWT = jwtDecode<DecodedJWT>(cookies.get("authToken"));

            console.log("setting authorized user", {
                name: decodedJWT[JWTClaims.Name],
                name_id: decodedJWT.sub,
                picture_url: decodedJWT[JWTClaims.PictureUrl],
                email: decodedJWT[JWTClaims.EmailAddress],
            });

            setAuthorizedUser({
                name: decodedJWT[JWTClaims.Name],
                name_id: decodedJWT.sub,
                picture_url: decodedJWT[JWTClaims.PictureUrl],
                email: decodedJWT[JWTClaims.EmailAddress],
            });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                handleLogout,
                authorizedUser,
                setAuthorizedUser,
                fetchAuthorizedUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
