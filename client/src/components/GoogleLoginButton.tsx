import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "@root/context/AuthContext";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const GoogleLoginButton = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    
    const { handleLogin } = useContext(AuthContext)!;
    
    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        const credential = credentialResponse.credential;
        if (credential) {
            const response = await fetch("/auth/signin-google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: credential }),
            });
            const json = await response.json();
            if (!json.token) {
                console.log("[google signin] failed to get a token back");
                return;
            }
            handleLogin(json.token);
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
                console.log("Login Failed");
            }}
            useOneTap={!isMobile}
        />
    );
};

export default GoogleLoginButton;