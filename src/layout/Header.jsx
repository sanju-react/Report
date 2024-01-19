import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../resourse/LOGO.png";

const Header = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const path = useLocation();
  const headers = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Report",
      link: "/report",
    },
    {
      title: "Task",
      link: "/task",
    },
    {
      title: "Preview",
      link: "/preview",
    },
    {
      title: "Project",
      link: "/project",
    },
  ];

  return (
    <>
      <div
        className={`  fixed ${
          sideMenu ? "flex" : "hidden"
        } md:hidden z-30 items-center gap-5 flex-col  p-6  left-0 top-0 h-screen  w-1/2 bg-gray-100`}
      >
        {headers?.map((header, i) => {
          if (header.title === "Home") {
            return (
              <Link
                to={header.link}
                onClick={() => {
                  setSideMenu(!sideMenu);
                }}
              >
                <img alt={header.title} className="aspect-auto" src={logo} />
              </Link>
            );
          } else {
            // Added 'return' here
            return (
              <Link
                to={header.link}
                onClick={() => {
                  setSideMenu(!sideMenu);
                }}
              >
                <h1
                  className={`hover:text-blue-600 text-bold text-[20px] leading-[10px] ${
                    path.pathname === header.link &&
                    "text-blue-600 underline underline-offset-8"
                  }  hover:underline hover:underline-offset-8 py-3`}
                >
                  {header.title}
                </h1>
              </Link>
            );
          }
        })}
      </div>

      <div className="  flex w-full justify-between h-[10vh]  border-t-gray-300 px-5">
        <div className=" w-44 h-full overflow-hidden py-2 flex justify-center items-center">
          <Link to="/">
            <img className="aspect-auto" src={logo} />
          </Link>
        </div>

        <div className=" md:flex hidden   justify-end items-center  h-full text-black  gap-5 w-3/4  font-thin">
          {headers?.map((header, i) => {
            if (header.title !== "Home") {
              return (
                <Link
                  to={header.link}
                  onClick={() => {
                    setSideMenu(!sideMenu);
                  }}
                >
                  <h1
                    className={`hover:text-blue-600 text-bold text-[20px] leading-[10px] ${
                      path.pathname === header.link &&
                      "text-blue-600 underline underline-offset-8"
                    }  hover:underline hover:underline-offset-8`}
                  >
                    {header.title}
                  </h1>
                </Link>
              );
            }
          })}{" "}
        </div>
        <div className=" md:hidden  flex  justify-end items-center  h-full text-black  gap-5 w-1/2  font-thin">
          <span
            onClick={() => {
              setSideMenu(!sideMenu);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
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
