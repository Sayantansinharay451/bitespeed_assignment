import { Message } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

function TextNode({ data, selected, targetPosition, sourcePosition }) {
    // const onChange = useCallback((evt) => {
    //     console.log(evt.target.value);
    //     console.log(data);
    // }, []);

    return (
        <>
            <Handle type="target" position={targetPosition} />
            <Box
                sx={{
                    width: "15rem",
                    minHeight: "6rem",
                    maxHeight: "15rem",
                    borderRadius: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                    overflow: "hidden",
                    outlineStyle: "solid",
                    outlineColor: (theme) => theme.palette.blue.dark,
                    outlineWidth: selected ? "0.1rem" : "0px",
                    boxShadow: (theme) => theme.shadows[11],
                    background: (theme) => theme.palette.white.secondary,
                }}
            >
                <Box
                    sx={{
                        height: "25%",
                        width: "100%",
                        display: "flex",
                        gap: "0.5rem",
                        padding: "0.5rem 1rem",
                        background: (theme) => theme.palette.blue.light,
                    }}
                >
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            fontSize: "0.75rem",
                            fontWeight: "500",
                        }}
                    >
                        <Message
                            sx={{
                                font: "inherit",
                            }}
                        />
                        Send Message
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flexGrow: "1",
                        padding: "0.5rem 1rem",
                        background: (theme) => theme.palette.white.main,
                        height: "100%",
                    }}
                >
                    <Typography
                        gutterBottom={false}
                        color="grey"
                        align="left"
                        sx={{
                            fontWeight: "400",
                            fontSize: "0.75rem",
                        }}
                    >
                        {data.label}
                    </Typography>
                </Box>
            </Box>
            <Handle type="source" position={sourcePosition} id="a" />
        </>
    );
}

export default TextNode;
