import React from "react";
import { Box } from "@mui/material";
import { nodeList } from "../NodeList";

const AddNodePanel = () => {
    const handleDrag = (event, node) => {
        event.dataTransfer.setData("flow", JSON.stringify(node));
        event.dataTransfer.effectAllowed = "move";
        // console.log(event);
    };
    return (
        <Box
            sx={{
                display: "flex",
                gap: "1rem 0.5rem",
                padding: "1rem 2rem",
            }}
        >
            {Object.keys(nodeList).map((key) => {
                const Component = nodeList[key].Button;
                return (
                    <div key={key}>
                        <Component onDrag={handleDrag} />
                    </div>
                );
            })}
        </Box>
    );
};

export default AddNodePanel;
