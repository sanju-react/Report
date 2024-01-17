import React from "react";
import { Link } from "react-router-dom";
import logo from "../resourse/LOGO.png";

const Header = () => {
  return (
    <>
      <div className="  flex w-full justify-between h-[10vh]  border-t-gray-300 px-5">
        <div className=" w-[5%] h-full overflow-hidden">
          <Link to="/">
            <img className="aspect-auto " src={logo} />
          </Link>
        </div>

        <div className="  flex justify-end items-center  h-full text-black  gap-5 w-3/4  font-thin">
          <Link to="/new" className="hover:text-blue-600 text-bold text-[20px] leading-[10px]">
            New Report
          </Link>
          <Link to="/assign" className="hover:text-blue-600 text-bold text-[20px] leading-[10px]">
            Assigned Tasks
          </Link>
          <Link to="/show" className="hover:text-blue-600 text-bold text-[20px] leading-[10px]">
            Show Previous
          </Link>
          <Link to="/projects" className="hover:text-blue-600 text-bold text-[20px] leading-[10px]">
            Projects
          </Link>
        </div>
      </div>
      <hr className="border-1 mx-5 mb-5" />

    </>
  );
};

export default Header;
