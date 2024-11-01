import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "@root/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { DecodedJWT, JWTClaims } from "@root/utils/JwtClaims";
import { useContext } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const GoogleLoginButton = () => {
    const { setIsAuthenticated } = useContext(AuthContext)!;

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        const credential = credentialResponse.credential;

        if (credential) {
            const response = await fetch("/auth/signin-google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: credential }),
            });

            const json = await response.json();
            const token = json.token;

            if (!token) {
                console.log("[google signin] failed to get a token back");
            }

            const decodedJWT = jwtDecode<DecodedJWT>(token);

            console.log(decodedJWT);

            const backupDate = new Date();
            backupDate.setHours(backupDate.getHours() + 1);

            const expirationDate = decodedJWT.exp
                ? new Date(decodedJWT.exp * 1000)
                : backupDate;

            cookies.set("authToken", token, {
                expires: expirationDate,
                sameSite: "strict",
            });

            setIsAuthenticated(true);
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
                console.log("Login Failed");
            }}
            useOneTap
        />
    );
};

export default GoogleLoginButton;
