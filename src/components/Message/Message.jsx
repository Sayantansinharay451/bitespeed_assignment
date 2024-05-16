import { Close } from "@mui/icons-material";
import { Alert, Box, Collapse, IconButton } from "@mui/material";
import React, { useState } from "react";

const Message = () => {
    const [open, setOpen] = useState(true);
    return (
        <Box
            sx={{
                position: "absolute",
                zIndex: "1",
                margin: "0.2rem",
                left: "50%",
                transform: "translateX(-50%)",
            }}
        >
            <Collapse in={open} timeout={500}>
                <Alert
                    severity="error"
                    variant="filled"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    Can not Save FLow
                </Alert>
            </Collapse>
        </Box>
    );
};

export default Message;
