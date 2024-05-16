import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { nodeList } from "./NodeList";

const AddNodePanel = () => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: "1rem 0.5rem",
                padding: "1rem 2rem",
            }}
        >
            {Object.keys(nodeList).map((key) => {
                const Component = nodeList[key];
                return (
                    <div key={key}>
                        <Component />
                    </div>
                );
            })}
        </Box>
    );
};

export default AddNodePanel;
