const Header = () => {
  return (
    <div className=" bg-slate-100 h-[100%]  w-[100%] flex justify-between ">
      <button className="rounded-lg bg-red-300 mt-[1%] mb-[0.5%] h-[40px] p-[2px] w-[150px] ml-[40%] ">
        Can not Save Flow
      </button>

      <button className="text-black hover:text-blue-700 border border-black rounded-lg w-[120px] mt-[1%] mb-[0.5%]  hover:border-spacing-5 hover:border-blue-500 px-[0.5%] mr-[6%]">
        Save Changes
      </button>
    </div>
  );
};

export default Header;
