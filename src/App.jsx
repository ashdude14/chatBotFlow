import AddNode from "./Component/AddNode";
import MessageCenter from "./Component/MessageCenter";
import Header from "./Component/Header";

const App = () => {
  return (
    <>
      <Header />

      <div className="flex-1 flex">
        <AddNode />
        <div className="w-[20%] h-screen  ">
          <MessageCenter />
        </div>
      </div>
    </>
  );
};

export default App;
