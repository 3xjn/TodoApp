import GoogleLoginButton from "@root/components/GoogleLoginButton";
import React from "react";
import { Box } from "@mui/material";

export const LoginPage: React.FC = () => {
    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100vh"
        >
            <GoogleLoginButton/>
        </Box>
    );
};