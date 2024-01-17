import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../resourse/LOGO.png";

const Header = () => {
  const [sideMenu, setSideMenu] = useState(false);

  

  return (
    <>
      <div className={`  fixed ${sideMenu ? "flex" : "hidden"} md:hidden items-center gap-5 flex-col  p-6  left-0 top-0 h-screen  w-1/2 bg-gray-100`}>
        <Link to="/">
          <img className="aspect-auto" src={logo} />
        </Link>
        <Link to="/new">
          <h1 className="hover:underline">New Report</h1>
        </Link>

        <Link to="/assign">
          <h1 className="hover:underline">Assigned Task</h1>
        </Link>

        <Link to="/show">
          <h1 className="hover:underline">Show Previous</h1>
        </Link>

        <Link to="/projects">
          <h1 className="hover:underline">Project</h1>
        </Link>
      </div>

      <div className="  flex w-full justify-between h-[10vh]  border-t-gray-300 px-5">
        <div className=" w-44 h-full overflow-hidden  flex justify-center items-center">
          <Link to="/">
            <img className="aspect-auto" src={logo} />
          </Link>
        </div>

        <div className=" md:flex hidden   justify-end items-center  h-full text-black  gap-5 w-3/4  font-thin">
          <Link
            to="/new"
            className="hover:text-blue-600 text-bold text-[20px] leading-[10px]"
          >
            New Report
          </Link>
          <Link
            to="/assign"
            className="hover:text-blue-600 text-bold text-[20px] leading-[10px]"
          >
            Assigned Tasks
          </Link>
          <Link
            to="/show"
            className="hover:text-blue-600 text-bold text-[20px] leading-[10px]"
          >
            Show Previous
          </Link>
          <Link
            to="/projects"
            className="hover:text-blue-600 text-bold text-[20px] leading-[10px]"
          >
            Projects
          </Link>
        </div>
        <div className=" md:hidden  flex  justify-end items-center  h-full text-black  gap-5 w-3/4  font-thin">
          <span 
          onClick={()=>{
            setSideMenu(!sideMenu)
          }}
          >
            
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </span>
        </div>
      </div>
      <hr className="border-1 mx-5 mb-5" />
    </>
  );
};

export default Header;
