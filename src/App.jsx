import AddNode from "./Component/AddNode";
import MessageCenter from "./Component/MessageCenter";
import Header from "./Component/Header";

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[10%]">
        <Header />
      </div>
      <div className="flex-1 flex ">
        <AddNode />
        <div className="w-1/5 h-full">
          <MessageCenter />
        </div>
      </div>
    </div>
  );
};

export default App;
