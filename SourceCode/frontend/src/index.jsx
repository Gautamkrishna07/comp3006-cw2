import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { PostContextProvider } from "./context/PostContext";
import { RelationshipContextProvider } from "./context/RelationshipContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <RelationshipContextProvider>
                <PostContextProvider>
                    <App />
                </PostContextProvider>
            </RelationshipContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
