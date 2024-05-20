import { Box, Divider, TextareaAutosize, Typography } from "@mui/material";
// import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState } from "react";

const textAreaStyles = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    padding: "0.2rem",
    fontSize: "1.2rem",
    outline: "none",
};

const TextNodeEditor = ({ node, modifyNode }) => {
    const [data, setData] = useState({
        label: node.data.label,
    });

    const handleOnChange = (event) => {
        const data = { label: event.target.value };
        setData(data);
        modifyNode(data, node.id);
    };
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    padding: "2rem",
                }}
            >
                <Typography
                    align="left"
                    variant="subtitle2"
                    fontSize={"1.2rem"}
                >
                    Text:
                </Typography>
                <TextareaAutosize
                    style={textAreaStyles}
                    minRows={3}
                    maxRows={5}
                    value={data.label}
                    onChange={handleOnChange}
                />
            </Box>
            <Divider />
        </Box>
    );
};

export default TextNodeEditor;
