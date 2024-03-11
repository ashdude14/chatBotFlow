// This is the setting div in which users drag the message icon and when they update the Message Node,
// writing a text on message in enabled for specific selected  Messagenode 
// I am using tailwind-css for styling and i am giving div width full and height full also the border to black
// It's tricky to give different state two state of component in this will look like 
// 1. Message icon and 2. Edit MessageNode but not same together 



import Message from "./Message";
const MessageCenter = () => {
  
  return (
    <div className=" w-full h-[100%] border border-black">
      <div className="w-[40%]">
         <Message/>
      </div>
    </div>
  );
};

export default MessageCenter;
