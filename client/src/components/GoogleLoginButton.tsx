import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { validateToken } from "@services/authService";

const GoogleLoginButton = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            sessionStorage.setItem("authToken", credentialResponse.credential); // Save token to localStorage
            
            const validated = await validateToken(credentialResponse.credential);

            console.log("got token it is...", validated ? "bad" : "good")
            
            // Optionally send it to the server for validation or further processing
            const response = await fetch("/auth/signin-google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: credentialResponse.credential })
            });

            if (response.ok) {
                onLoginSuccess();  // Notify the parent that login was successful
            }
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