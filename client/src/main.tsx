import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeContextProvider } from "@context/ThemeContext";
import { PageHandler } from "@pages/PageHandler";
import { AuthContextProvider } from "@context/AuthContext";
import { AlertProvider } from "./context/AlertContext";

const rootEl = document.getElementById("root");

if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);

    root.render(
        <React.StrictMode>
            <GoogleOAuthProvider clientId="484752690636-37mnsuepvlsrjkjvemmjs8025bupmdha.apps.googleusercontent.com">
                <AlertProvider>
                    <AuthContextProvider>
                        <ThemeContextProvider>
                            <PageHandler></PageHandler>
                        </ThemeContextProvider>
                    </AuthContextProvider>
                </AlertProvider>
            </GoogleOAuthProvider>
        </React.StrictMode>
    );
}
