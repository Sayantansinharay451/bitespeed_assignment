import { createSlice, configureStore } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { Position } from "reactflow";
import { v4 as uuid } from "uuid";

export const createNode = (data, type, position) => {
    return {
        id: uuid(),
        data: data,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type: type,
        position: position,
        absolutePosition: position,
        selected: true,
    };
};

export const createEdge = (source, target) => {
    return {
        id: `${source}-${target}`,
        source: source,
        target: target,
    };
};
// Define the initial state
const initialState = {
    nodes: [],
    edges: [],
    message: {},
};

// Define the slice
const flowSlice = createSlice({
    name: "flow",
    initialState,
    reducers: {
        addNode: (state, action) => {
            const { data, type, position } = action.payload;
            const newNode = createNode(data, type, position);
            state.nodes.push(newNode);
        },
        deselectNodes: (state) => {
            state.nodes = state.nodes.map((node) => ({
                ...node,
                selected: false,
            }));
        },
        updateNodeData: (state, action) => {
            const updatedNode = action.payload;
            state.nodes = state.nodes.map((node) =>
                node.id === updatedNode.id ? updatedNode : node
            );
        },
        updateStore: (state, action) => {
            const { nodes, edges } = action.payload;
            state.nodes = nodes || [];
            state.edges = edges || [];
        },
        resetMessage: (state) => {
            state.message = {};
        },
        saveNodes: (state) => {
            const nodeIds = state.nodes.map((node) => node.id);
            const ids = new Set(
                state.edges.flatMap((edge) => [edge.target, edge.source])
            );

            if (nodeIds.length === ids.size) {
                localStorage.setItem(
                    "flowState",
                    JSON.stringify({ nodes: state.nodes, edges: state.edges })
                );
                state.message = {
                    status: "success",
                    text: "Flow saved successfully!",
                };
            } else {
                state.message = {
                    status: "error",
                    text: "Flow can't be saved!",
                };
            }
        },
    },
});

const selectNodes = (state) => state.nodes;

export const selectedNodes = createSelector([selectNodes], (nodes) =>
    nodes.filter((nodes) => nodes.selected)
);

// Export the actions
export const {
    addNode,
    deselectNodes,
    updateNodeData,
    updateStore,
    resetMessage,
    saveNodes,
} = flowSlice.actions;

// Create the store
const store = configureStore({
    reducer: flowSlice.reducer,
});

export default store;
