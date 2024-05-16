import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    Background,
    Panel,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    isNode,
    updateEdge,
    useEdgesState,
    useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectNode } from "../../Store/store";
import { useDroppable } from "@dnd-kit/core";
import { nodeTypes } from "./NodeType/NodeType";

const Flow = () => {
    const dispatch = useDispatch();
    const initialNodes = useSelector((state) => state.flow.nodes);
    const initialEdges = useSelector((state) => state.flow.edges);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const edgeUpdateSuccessful = useRef(true);

    const { setNodeRef } = useDroppable({
        id: "flow-droppable",
        data: {
            accepts: [...Object.keys(nodeTypes)],
        },
    });

    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [initialEdges, initialNodes, setEdges, setNodes]);

    const handleOnEdgesChange = useCallback(
        (changes) => {
            onEdgesChange(changes);
        },
        [onEdgesChange]
    );

    const onConnect = useCallback(
        ({ source, target }) => {
            return setEdges((eds) =>
                nodes
                    .filter((node) => node.id === source || node.selected)
                    .reduce(
                        (eds, node) =>
                            addEdge({ source: node.id, target }, eds),
                        eds
                    )
            );
        },
        [nodes]
    );

    const onSelectionChange = (elements) => {
        dispatch(selectNode(elements.nodes));
    };

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
    }, []);

    const onEdgeUpdateEnd = useCallback((_, edge) => {
        if (!edgeUpdateSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }

        edgeUpdateSuccessful.current = true;
    }, []);

    return (
        <Box
            ref={setNodeRef}
            sx={{
                width: "100%",
                height: "100%",
                background: (theme) => theme.palette.white.light,
            }}
        >
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={handleOnEdgesChange}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onSelectionChange={onSelectionChange}
                fitView
            ></ReactFlow>
        </Box>
    );
};

Flow.propTypes = {
    nodeTypes: PropTypes.object.isRequired,
};

export default Flow;
