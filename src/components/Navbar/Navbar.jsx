import { Button, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { deselectNodes, saveNodes, updateStore } from "../../Store/store";
import { useReactFlow } from "reactflow";

const Navbar = () => {
    const reactFlowInstance = useReactFlow();
    const dispatch = useDispatch();
    const handleSave = () => {
        dispatch(
            updateStore({
                nodes: reactFlowInstance.getNodes(),
                edges: reactFlowInstance.getEdges(),
            })
        );
        dispatch(deselectNodes());
        dispatch(saveNodes());
    };
    return (
        <Toolbar
            sx={{
                background: (theme) => theme.palette.white.dark,
                boxShadow: (theme) => theme.shadows[1],
            }}
        >
            <Button
                sx={{
                    margin: "auto 2rem",
                    marginLeft: "auto",
                    textTransform: "none",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    background: "#fff",
                    borderWidth: "0.2rem",
                    borderRadius: "0.5rem",
                    padding: "0.2rem 1.5rem",
                }}
                disableRipple
                aria-details="Save the chat flow"
                variant="outlined"
                color="blue"
                onClick={handleSave}
            >
                Save Changes
            </Button>
        </Toolbar>
    );
};

export default Navbar;
