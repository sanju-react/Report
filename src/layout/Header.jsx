import React from "react";
import { Link } from "react-router-dom";
import logo from "../resourse/logo-color.jpg";

const Header = () => {
  return (
    <>
      <div className="  flex w-full justify-between h-[10vh] px-3 text-white border-t-gray-300 border bottom-2 bg-[#13253D] font-extralight  ">
        <div className=" w-[5%] h-full overflow-hidden">
          <Link to="/">
            <img className="aspect-auto " src={logo} />
          </Link>
        </div>

        <div className="  flex justify-end items-center  h-full  gap-5 w-3/4  font-semibold">
          <Link to="/new" className="text-[20px] leading-[10px]">
            New Report
          </Link>
          <Link to="/assign" className="text-[20px] leading-[10px]">
            Assigned Tasks
          </Link>
          <Link to="/show" className="text-[20px] leading-[10px]">
            Show Previous
          </Link>
          <Link to="/projects" className="text-[20px] leading-[10px]">
            Projects
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
