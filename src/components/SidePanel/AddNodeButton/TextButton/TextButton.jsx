import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MessageOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React from "react";

const TextButton = () => {
    const { attributes, listeners, setButtonRef, transform } = useDraggable({
        id: "button-draggable",
        data: {
            type: "textNode",
            data: {
                label: null,
            },
        },
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <Button
            ref={setButtonRef}
            {...listeners}
            {...attributes}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                borderWidth: "0.25rem",
                padding: "1rem 3rem",
            }}
            style={style}
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
