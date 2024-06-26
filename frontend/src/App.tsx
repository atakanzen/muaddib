import { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  OnConnect,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { customNodeTypes } from "./constants/customNodeTypes";
import { customEdgeTypes } from "./constants/customEdgeTypes";

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Decision Node" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Chance Node" } },
  {
    id: "3",
    type: "textUpdater",
    position: { x: 0, y: 200 },
    data: { value: 123 },
  },
];

const initalEdges: Edge[] = [
  { type: "customEdge", id: "e1-2", source: "1", target: "2" },
];

function App() {
  const [nodes, _setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initalEdges);

  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((eds) => addEdge({ ...connection, type: "customEdge" }, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => customNodeTypes, []);
  const edgeTypes = useMemo(() => customEdgeTypes, []);

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="#CCC"
          gap={12}
          size={1}
        />
        <MiniMap />
        <Controls />
        <Panel
          position="top-left"
          className="bg-orange-500 text-white font-bold hover:cursor-pointer p-2 rounded"
        >
          <span>TopLeft</span>
        </Panel>
        <Panel
          position="top-center"
          className="bg-orange-500 text-white font-bold hover:cursor-pointer p-2 rounded"
        >
          <span>TopCenter</span>
        </Panel>
        <Panel
          position="top-right"
          className="bg-orange-500 text-white font-bold hover:cursor-pointer p-2 rounded"
        >
          <span>TopRight</span>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default App;
