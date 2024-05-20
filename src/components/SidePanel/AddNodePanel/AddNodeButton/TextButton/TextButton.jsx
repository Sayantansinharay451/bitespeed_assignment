import { MessageOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

const textNode = {
    type: "textNode",
    data: {
        label: "",
    },
};

const TextButton = ({ onDrag }) => {
    return (
        <Button
            draggable
            onDragStart={(event) => onDrag(event, textNode)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                borderWidth: "0.25rem",
                padding: "1rem 3rem",
            }}
            variant="outlined"
            color="blue"
        >
            <MessageOutlined fontSize="large" />
            <Typography
                sx={{
                    textTransform: "none",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                }}
            >
                Message
            </Typography>
        </Button>
    );
};

export default TextButton;
