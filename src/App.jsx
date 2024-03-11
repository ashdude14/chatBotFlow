import MessageCenter from "./Component/MessageCenter";
import Header from "./Component/Header";
import NewNode from "./Component/NewNode";
import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[10%]">
        <Header />
      </div>
      <div className="flex-1 flex ">
        {/* 
           <NewNode   data={{ type:'Send Message', value:`text message ` }}/>
        */}

        {/** here want to add custom node <NewNode>*/}
      {/* <NewNode data={{ type: 'Send Message', value: `text message ` }} /> */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
        </ReactFlow>
        <div className="w-1/5 h-full">
          <MessageCenter />
        </div>
      </div>
    </div>
  );
};

export default App;
