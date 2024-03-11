// this is the message icon component which is going to be drag-and-drop in react-flow screen
// I am using react-icons for creating message icon and assigning the tailkwind-css className for style
// the div will have black border with height full and width-full
// I am using flex for icon and message label position setup here flex by colomn will set icon and label above and just below
// and further center position will set using item-center and justify-center
// I am assigning the margin bottom of 2em= 8px for icon
// In this JSX componenet I am developing the drag-and-drop functionality for Message component 
//As we know there are four stage mainly for drag and drag as  draggable, ondragstart, ondragover and ondrop,In this component I implemented first two (pto)
// making component draggable and asssigning the function ondragHandler 
// Idea is to drag this component in the react-flow playground (App.jsx) and when this component is released it should convert to a message node in flow.
import { BiMessageRoundedDetail } from "react-icons/bi";

const Message = () => {
  // function to handle onDragStart
  function onDragStartHandler(event, messageNode) {
    event.preventDefault();
    event.dataTransfer.setData("addNode", messageNode);
    event.dataTransfer.effectAllowed = "move";
    console.log("DragStarted");
  }

  return (
    <div
      className="h-full w-full border border-black flex flex-col justify-center items-center "
      draggable
      onDragStart={(event) => {
        onDragStartHandler(event, "default");
      }}
    >
      <div className="mb-2">
        <BiMessageRoundedDetail className="text-3xl" />
      </div>
      <label className="text-sm">Message</label>
    </div>
  );
};

export default Message;
