// Here I am making a reusable custom node of message that will use after every drag and drop
// As it has a type "source" & "target" will helpful while connecting edges
//Again I am using tailwind-css for styling and react-icons for whatsApp logo icon

import { Handle, Position } from "reactflow";
import { IoLogoWhatsapp } from "react-icons/io5";

// Message Node with name and message text

/* eslint-disable react/prop-types */

const NewNode = ({ data }) => {
  return (
    <div>
      <div className="bg-teal-200 rounded-t-lg font-bold text-black px-4 py-2 flex justify-between items-center w-64">
        <div className="flex items-center">
          <span className=" text-sm pr-2 pt-1">chat</span>
          {data.head}
        </div>
        <div className="pr-4">
          <IoLogoWhatsapp />
        </div>
      </div>
      <div className="bg-slate-200 px-4 py-2 rounded-b-lg">
        <div className="text-black">{data.value}</div>
      </div>
      <Handle type="target" position={Position.Left} id="target" />
      <Handle type="source" position={Position.Right} id="source" />
    </div>
  );
};

export default NewNode;
