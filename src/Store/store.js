import { createSlice, configureStore } from "@reduxjs/toolkit";
import { MarkerType, Position } from "reactflow";
import { v4 as uuid } from "uuid";

const createNode = (data, type) => {
    return {
        id: uuid(),
        data: data,
        sourcePosition: Position.Left,
        targetPosition: Position.Right,
        type: type,
        selected: true,
        position: { x: 0, y: 0 },
    };
};

// Define the initial state
const initialState = {
    nodes: [
        {
            id: "1",
            data: { label: "Hello" },
            position: { x: 0, y: 0 },
            type: "textNode",
        },
        {
            id: "2",
            data: { label: "World" },
            position: { x: 100, y: 100 },
        },
    ],
    edges: [
        {
            id: "1-2",
            source: "1",
            target: "2",
            markerEnd: {
                type: MarkerType.ArrowClosed,
            },
        },
    ],
    selectedNode: null,
};

// Define the slice
const flowSlice = createSlice({
    name: "flow",
    initialState,
    reducers: {
        addNode: (state, action) => {
            const { data, type } = action.payload;
            const newNode = createNode(data, type);
            console.log(newNode);
            state.nodes.push(newNode);
        },
        updateNode: (state, action) => {
            const { id, data } = action.payload;
            const nodeIndex = state.nodes.findIndex((node) => node.id === id);
            if (nodeIndex !== -1) {
                state.nodes[nodeIndex] = { ...state.nodes[nodeIndex], ...data };
            }
        },
        selectNode: (state, action) => {
            state.selectedNode = action.payload;
        },
        deselectNode: (state) => {
            state.selectedNode = null;
        },
        addEdge: (state, action) => {
            state.edges.push(action.payload);
        },
        updateEdge: (state, action) => {
            const { id, data } = action.payload;
            const edgeIndex = state.edges.findIndex((edge) => edge.id === id);
            if (edgeIndex !== -1) {
                state.edges[edgeIndex] = { ...state.edges[edgeIndex], ...data };
            }
        },
        removeNode: (state, action) => {
            state.nodes = state.nodes.filter(
                (node) => node.id !== action.payload
            );
        },
        removeEdge: (state, action) => {
            state.edges = state.edges.filter(
                (edge) => edge.id !== action.payload
            );
        },
        save: (state, action) => {},
    },
});

// Export the actions
export const {
    addNode,
    updateNode,
    selectNode,
    deselectNode,
    addEdge,
    updateEdge,
    removeNode,
    removeEdge,
} = flowSlice.actions;

// Create the store
const store = configureStore({
    reducer: {
        flow: flowSlice.reducer,
    },
});

store.subscribe(() => {
    localStorage.setItem("flowState", JSON.stringify(store.getState().flow));
});

export default store;
