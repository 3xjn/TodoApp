import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import { TodosProvider } from "@context/TodosContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeContextProvider } from "@context/ThemeContext";
import { PageHandler } from "@pages/PageHandler";
import { AuthContextProvider } from "@context/AuthContext";

const rootEl = document.getElementById("root");

let counter = 0;
const onRender = () => {
    console.log(counter);
    counter++;
};

if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);

    root.render(
        <React.StrictMode>
            <Profiler id="App" onRender={onRender}>
                <GoogleOAuthProvider clientId="484752690636-37mnsuepvlsrjkjvemmjs8025bupmdha.apps.googleusercontent.com">
                    <TodosProvider>
                        <AuthContextProvider>
                            <ThemeContextProvider>
                                <PageHandler></PageHandler>
                            </ThemeContextProvider>
                        </AuthContextProvider>
                    </TodosProvider>
                </GoogleOAuthProvider>
            </Profiler>
        </React.StrictMode>
    );
}
