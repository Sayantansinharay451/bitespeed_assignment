import { ArrowBack } from "@mui/icons-material";
import {
    Box,
    Divider,
    IconButton,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SettingsPanel = ({ nodes, modifyNode }) => {
    console.log(nodes);

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
                <IconButton>
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
            {nodes.map((node) => (
                <Box key={node.id}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            padding: "2rem",
                        }}
                    >
                        <Typography align="left" variant="subtitle2">
                            Text:
                        </Typography>
                        <TextareaAutosize
                            minRows={3}
                            maxRows={5}
                            value={node.data.label ? node.data.label : ""}
                            onChange={(event) => modifyNode(event, node.id)}
                        />
                    </Box>
                    <Divider />
                </Box>
            ))}
        </Box>
    );
};

export default SettingsPanel;
