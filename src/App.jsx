/* eslint-disable no-unused-vars */
import { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Component/Sidebar";
import newNode from "./Component/NewNode";
import UpdateNode from "./Component/UpdateNode";

let id = 0;
const getId = () => `ashdude14_${id++}`;

const chekMap = new Map(); // initializing a hashMap to keep track of source and target
// on every connection hashmap  tracks of source and target
// key of this map is source node and value for this map is an array of target node

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeSelected, setNodeSelected] = useState(false);
  const [changeNode, setChangeNode] = useState(null);
  const [red, setRed] = useState(true);
  const [show, setShow] = useState(false);

  // determine when a node is selected by user

  const update = useCallback(
    (event, node) => {
      // console.log(event, node);
      setChangeNode(node);
      setNodeSelected(true);
      setShow((pre) => {
        setShow(!pre);
      });
    },
    [setShow]
  );

  const onConnect = useCallback(
    (params) => {
      if (chekMap.has(params.source)) {
        // Inserting every connection in hasMap if key is matched will increase length of either  source/target
        // If the key exists, get the existing value and append the new target to its array
        const existingValue = chekMap.get(params.source);
        existingValue.push(params.target);
        chekMap.set(params.source, existingValue);
      } else {
        // If the key doesn't exist, create a new array with the target value and set it as the value for the key
        chekMap.set(params.source, [params.target]);
      }

      // single ended arrow for connecting edges
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
      );
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
        type: "node",
        position,
        data: { head: "Send Message", value: `text message ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const messageNode = useMemo(
    () => ({
      node: newNode,
    }),
    []
  );

  const legalCheck = useCallback(() => {
    // I am making these  two conditions legal and, iff these conditions passed then the flow will saved.

    // 1. As per requirement for every node there can be only one edge connectong  source node, and
    // 2. can have more than one edge connecting to a  target node
    // So with the help of HashMap I going to track source and target edge connections

    // Checking for connecting edges having the same node but more than one source connecting edge to target/targets
    for (const val of chekMap) {
      if (val[1].length > 1) {
        return true; // Exiting the loop once we find a duplicate source
      }
    }

    // Checking if every node should be connected
    if (chekMap.size !== nodes.length - 1) {
      //console.log("not connected ");
      return true;
    }

    return false;
  }, [nodes.length]);

  return (
    <div className="h-screen flex flex-col">
      <ReactFlowProvider>
        <div className="h-[10%]">
          {/* topbar code here*/}
          <div className=" bg-slate-100 h-[100%]  w-[100%] flex justify-between ">
            <button
              className={`rounded-lg ${
                red ? ` bg-red-300` : `bg-green-300`
              } mt-[1%] mb-[0.5%] h-[40px] p-[2px] w-[150px] ml-[40%] `}
            >
              {red ? ` Can not Save Flow` : `Flow Saved`}
            </button>

            <button
              className="text-black hover:text-blue-700 border border-black rounded-lg w-[120px] mt-[1%] mb-[0.5%]  
            hover:border-spacing-5 hover:border-blue-500
             px-[0.5%] mr-[6%]"
              onClick={() => {
                setTimeout(() => {
                  legalCheck() ? setRed(true) : setRed(false);
                }, 1000);
              }}
            >
              Save Changes
            </button>
          </div>
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
            onNodeClick={update}
            nodeTypes={messageNode} //can define custom nodetype here i am uisng message node
            fitView
          >
            <Controls />
          </ReactFlow>

          <div className="w-1/5 h-full relative">
            {show && (
              <div className="absolute text-black/90 bg-blue-100 w-full">
                <UpdateNode
                  selectedNode={changeNode}
                  setNodeSelected={setNodeSelected}
                  setNodes={setNodes}
                />
              </div>
            )}
            <Sidebar show={show} />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
