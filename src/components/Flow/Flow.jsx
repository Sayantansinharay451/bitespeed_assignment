import { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
    MarkerType,
    addEdge,
    updateEdge,
    useEdgesState,
    useNodesState,
    useOnSelectionChange,
    useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import { addNode, updateStore } from "../../Store/store";
import { nodeTypes } from "./NodeType/NodeType";

const defaultEdgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
    },
    deletable: true,
};

const Flow = () => {
    const dispatch = useDispatch();
    const initialNodes = useSelector((store) => store.nodes);
    const initialEdges = useSelector((store) => store.edges);
    const reactFlowInstance = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState();
    const [edges, setEdges, onEdgesChange] = useEdgesState();
    const edgeUpdateSuccessful = useRef(true);

    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [initialEdges, initialNodes, setEdges, setNodes]);

    const handleOnNodeDragStop = () => {
        dispatch(updateStore({ nodes, edges }));
    };

    useOnSelectionChange({
        onChange: () => {
            dispatch(updateStore({ nodes, edges }));
        },
    });

    const handleOnEdgesChange = useCallback(
        (changes) => {
            onEdgesChange(changes);
        },
        [onEdgesChange]
    );

    const handleOnNodesChange = useCallback(
        (changes) => {
            onNodesChange(changes);
        },
        [onNodesChange]
    );

    const onConnect = useCallback(
        (params) => setEdges((els) => addEdge(params, els)),
        [setEdges]
    );

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdate = useCallback(
        (oldEdge, newConnection) => {
            edgeUpdateSuccessful.current = true;
            setEdges((els) => updateEdge(oldEdge, newConnection, els));
        },
        [setEdges]
    );

    const onEdgeUpdateEnd = useCallback(
        (_, edge) => {
            if (!edgeUpdateSuccessful.current) {
                setEdges((eds) => eds.filter((e) => e.id !== edge.id));
            }
            edgeUpdateSuccessful.current = true;
        },
        [setEdges]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const { type, data } = JSON.parse(
                event.dataTransfer.getData("flow")
            );
            if (typeof type === "undefined" || !type) {
                return;
            }
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            dispatch(updateStore({ nodes, edges }));
            dispatch(addNode({ type, data, position }));
        },
        [dispatch, reactFlowInstance, nodes, edges]
    );

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleOnNodesChange}
                onEdgesChange={handleOnEdgesChange}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                onNodeDragStop={handleOnNodeDragStop}
                onDrop={onDrop}
                onDragOver={onDragOver}
                defaultEdgeOptions={defaultEdgeOptions}
            />
        </div>
    );
};

export default Flow;
