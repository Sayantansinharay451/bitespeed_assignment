import { Box } from "@mui/material";
import SettingsPanel from "./SettingsPanel/SettingsPanel";
import AddNodePanel from "./AddNodePanel/AddNodePanel";
import { selectedNodes, updateNodeData } from "../../Store/store";
import { useDispatch, useSelector } from "react-redux";

const SidePanel = () => {
    const dispatch = useDispatch();
    const nodes = useSelector((state) => selectedNodes(state));
    const handleModifyNode = (data, selectedNodeId) => {
        const updatedNode = {
            ...nodes.find((node) => node.id === selectedNodeId),
            data: data,
        };
        dispatch(updateNodeData(updatedNode));
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
