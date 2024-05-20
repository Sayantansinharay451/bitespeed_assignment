import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { nodeList } from "../NodeList";
import { deselectNodes } from "../../../Store/store";

const SettingsPanel = ({ nodes, modifyNode }) => {
    const dispatch = useDispatch();
    return (
        <Box
            sx={{
                color: (theme) => theme.palette.grey.dark,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                    borderBottomWidth: "0.2rem",
                    borderBottomColor: (theme) => theme.palette.grey.light,
                    borderBottomStyle: "solid",
                }}
            >
                <IconButton onClick={() => dispatch(deselectNodes())}>
                    <ArrowBack />
                </IconButton>
                <Typography
                    align="center"
                    sx={{
                        flexGrow: "1",
                        fontSize: "1.2rem",
                        fontWeight: "500",
                    }}
                >
                    Back
                </Typography>
            </Box>
            {nodes.map((node) => {
                const Editor = nodeList[node.type].Editor;
                return (
                    <Editor key={node.id} node={node} modifyNode={modifyNode} />
                );
            })}
        </Box>
    );
};

export default SettingsPanel;
