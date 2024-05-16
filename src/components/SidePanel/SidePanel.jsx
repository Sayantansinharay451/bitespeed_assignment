import { Box, TextareaAutosize, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNode } from "../../Store/store";
import SettingsPanel from "./SettingsPanel/SettingsPanel";
import AddNodePanel from "./AddNodePanel/AddNodePanel";

const SidePanel = () => {
    const selectedNode = useSelector((state) => state.flow.selectedNode);
    const [nodes, setNodes] = useState(selectedNode);

    // Update data state whenever selectedNode changes
    useEffect(() => {
        setNodes(selectedNode);
    }, [selectedNode]);

    const handleModifyNode = (event, selectedNodeId) => {
        const newLabel = event.target.value;

        setNodes((prevNodes) => {
            const updatedNode = {
                ...prevNodes.find((node) => node.id === selectedNodeId),
                data: {
                    label: newLabel,
                },
            };
            return prevNodes.map((node) =>
                node.id === selectedNodeId ? updatedNode : node
            );
        });
    };

    return (
        <Box
            sx={{
                width: "20%",
                height: "100%",
                background: (theme) => theme.palette.white.dark,
                boxShadow: (theme) => theme.shadows[10],
                display: "flex",
                flexDirection: "column",
            }}
        >
            {nodes && nodes.length ? (
                <SettingsPanel nodes={nodes} modifyNode={handleModifyNode} />
            ) : (
                <AddNodePanel />
            )}
        </Box>
    );
};

export default SidePanel;
