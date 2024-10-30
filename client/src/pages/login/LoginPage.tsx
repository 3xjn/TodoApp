import GoogleLoginButton from "@root/components/GoogleLoginButton";
import React, { useContext } from "react";
import { Box } from "@mui/material";
import { AuthContext } from "@root/context/AuthContext";
import { getProfilePicture } from "@root/services/api";

export const LoginPage: React.FC = () => {
    const { setIsAuthenticated, setProfileUrl } = useContext(AuthContext)!;

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100vh"
        >
            <GoogleLoginButton
                onLoginSuccess={async () => {
                    setIsAuthenticated(true);
                    const profileUrl = await getProfilePicture();
                    setProfileUrl(profileUrl);
                }}
            />
        </Box>
    );
};