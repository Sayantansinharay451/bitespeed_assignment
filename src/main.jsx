import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import { ReactFlowProvider } from "reactflow";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <ReactFlowProvider>
                <App />
            </ReactFlowProvider>
        </Provider>
    </React.StrictMode>
);
