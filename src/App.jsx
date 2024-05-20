import { useEffect } from "react";
import Flow from "./components/Flow/Flow";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import SidePanel from "./components/SidePanel/SidePanel";
import { useDispatch } from "react-redux";
import { updateStore } from "./Store/store";
import Message from "./components/Message/Message";

const theme = createTheme({
    palette: {
        blue: {
            dark: "#0E2A47",
            main: "#287FAA",
            light: "#53B0D0",
        },
        white: {
            main: "#FFF",
            dark: "#f1f1f1",
            light: "#f8f8f8",
        },
        error: { main: "#DD4935" },
        grey: {
            dark: "#22282A",
            main: "#7C7C7C",
            light: "#CCCCCF",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const flowState = localStorage.getItem("flowState");
        if (flowState) {
            try {
                const { nodes, edges } = JSON.parse(flowState);
                const store = {
                    nodes: nodes || [],
                    edges: edges || [],
                };
                dispatch(updateStore(store));
            } catch (error) {
                console.error(
                    "Error parsing flowState from localStorage:",
                    error
                );
                // Handle error, e.g., dispatch an error action or set default state
                dispatch(updateStore({ nodes: [], edges: [] }));
            }
        } else {
            // If flowState does not exist in localStorage, set default state
            dispatch(updateStore({ nodes: [], edges: [] }));
        }
    }, [dispatch]);
    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <Message />
                <Navbar />
                <div style={{ height: "100%", display: "flex" }}>
                    <Flow />
                    <SidePanel />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
