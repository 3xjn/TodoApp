import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { TodosProvider } from "@context/TodosContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
                        <App />
                    </TodosProvider>
                </GoogleOAuthProvider>
            </Profiler>
        </React.StrictMode>
    );
}
