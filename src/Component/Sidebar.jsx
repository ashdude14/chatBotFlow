/* eslint-disable react/prop-types */
// I am using flex for icon and message label position setup here flex by colomn will set icon and label above and just below
// and further center position will set using item-center and justify-center
// I am assigning the margin bottom of 2em= 8px for icon
// In this JSX componenet I am developing the drag-and-drop functionality for Message component
//As we know there are four stage mainly for drag and drag as  draggable, ondragstart, ondragover and ondrop,In this component I implemented first two (pto)
// making component draggable and asssigning the function ondragHandler
// Idea is to drag this component in the react-flow playground (App.jsx) and when this component is released it should convert to a message node in flow.

// This is the setting div in which users drag the message icon and when they update the Message Node,
// writing a text on message in enabled for specific selected  Messagenode
// It's tricky to give different state two state of component in this will look like
// 1. Message icon and 2. Edit MessageNode but not same together

import { BiMessageRoundedDetail } from "react-icons/bi";

const Sidebar = (props) => {
  // function to handle onDragStart
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className=" w-full h-[100%] border border-black">
      <div className="w-[40%]">
        <div
          className={`h-full w-full border border-black flex flex-col justify-center items-center  ${props.show? `hidden` : `block`}`}
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          <div className={`mb-2`}>
            <BiMessageRoundedDetail className="text-3xl" />
          </div>
          <label className="text-sm">Message</label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
