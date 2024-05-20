import { Close } from "@mui/icons-material";
import { Alert, Box, Collapse, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "../../Store/store";

const collapseTimeOut = 500;
const Message = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.message);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const removeMessage = () => {
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        };

        if (message.text) {
            setOpen(true);
            removeMessage();
        } else setOpen(false);

        return () => {
            clearTimeout(removeMessage);
        };
    }, [message]);

    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                dispatch(resetMessage());
            }, collapseTimeOut);
        }
    }, [dispatch, open]);

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
            <Collapse in={open} timeout={collapseTimeOut}>
                <Alert
                    severity={message.status}
                    variant="filled"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setOpen(false)}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message.text}
                </Alert>
            </Collapse>
        </Box>
    );
};

export default Message;
