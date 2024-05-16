import Flow from "./components/Flow/Flow";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import TextNode from "./components/Flow/NodeType/TextNode/TextNode";
import SidePanel from "./components/SidePanel/SidePanel";
import { Provider, useDispatch } from "react-redux";
import { addNode } from "./Store/store";
import Message from "./components/Message/Message";
import { DndContext } from "@dnd-kit/core";

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
    const reactFlowWrapper = useRef();

    const handleOnSave = () => {};

    const handleDrop = useCallback((event) => {
        dispatch(addNode(event.active.data.current));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <Message />
                <Navbar onSave={handleOnSave} />
                <div style={{ height: "100%", display: "flex" }}>
                    <DndContext onDragEnd={handleDrop}>
                        <div
                            ref={reactFlowWrapper}
                            className="reactflow-wrapper"
                            style={{
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <Flow />
                        </div>
                        <SidePanel />
                    </DndContext>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
