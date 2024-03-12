import { useState, useRef, useCallback, useMemo} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Component/Sidebar";
import Header from "./Component/Header";
import newNode from "./Component/NewNode"

let id = 0;
const getId = () => `dndnode_${id++}`;


function App()  {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);



  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );



  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);



  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: 'node',
        position,
        data: { head: 'Send Message', value: `text message ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [ reactFlowInstance, setNodes]
  );


  const messageNode = useMemo(
    () => ({
      node: newNode,
    }),
    []
  )

  return (
    <div className="h-screen flex flex-col">
        <ReactFlowProvider>
       <div className="h-[10%]">
       <Header/>
       </div>
   
        <div className="flex-1 flex" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={messageNode}   //can define custom nodetype here i am uisng message node 
            fitView 
          >
            <Controls />
          </ReactFlow>
     
        <div className="w-1/5 h-full">
        <Sidebar />      
       </div>

        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
