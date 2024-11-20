import { React } from 'react';

const NavBarSign = () => {
  return (
    <div className=" flex items-center justify-between  h-[55px] border-[2px] p-[20px] border-gray-300 w-full">
      <div className="flex gap-[10px]">
        <img src="/Hotjar.png" alt="" className="w-[20px] h-[20px]" />
        <span className="text-black text-[15px] font-medium font-rubik">
          Avito Surveys
        </span>
        <img src="/back2.png" alt="" className="w-[100px] h-[30px]" />
      </div>
    </div>
  );
};

export default NavBarSign;
