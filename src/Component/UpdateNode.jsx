/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useReactFlow } from "reactflow";

// eslint-disable-next-line react/prop-types
const UpdateNode = ({ selectedNode, setNodes, show }) => {
  // head -Send Message
  // value- text Message
  const [nodeName, setNodeName] = useState(selectedNode.data["value"]);

  let id = selectedNode.id;

  useEffect(() => {
    setNodeName(selectedNode.data["value"]);
  }, [selectedNode.data]);

  // update the node on click of the save changes button
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            value: nodeName,
          };
        }

        return node;
      })
    );
  }, [selectedNode, nodeName, setNodes]);

  // onclick of the save changes button change from update sidebar to main node content sidebar

  return (
    <>
      <div className="w-full">
        <h3 className="text-lg m-1">Message:</h3>
        <textarea
          rows={4}
          className="border border-spacing-1 bg-red-200 text-lg text-bold w-[96%] mx-[2%] rounded-lg "
          value={nodeName}
          onChange={(event) => {
            setNodeName(event.target.value);
          }}
          onSubmit={(event) => {
            setNodeName(event.target.value);
          }}
        />
      </div>
    </>
  );
};

export default UpdateNode;
