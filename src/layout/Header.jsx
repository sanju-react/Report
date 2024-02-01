import React, { useState, useEffect } from "react";
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
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="25"
          fill="currentColor"
          className="  bi-file-earmark-bar-graph"
          viewBox="0 0 16 16"
        >
          <path d="M10 13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z" />
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
        </svg>
      ),
    },
    {
      title: "Task",
      link: "/task",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="25"
          fill="currentColor"
          className="bi bi-envelope-plus"
          viewBox="0 0 16 16"
        >
          <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
          <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5" />
        </svg>
      ),
    },
    {
      title: "Preview",
      link: "/preview",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="25"
          fill="currentColor"
          className="bi bi-eye"
          viewBox="0 0 16 16"
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
        </svg>
      ),
    },
    {
      title: "Project",
      link: "/project",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="25"
          fill="currentColor"
          className="bi bi-briefcase"
          viewBox="0 0 16 16"
        >
          <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5" />
        </svg>
      ),
    },
  ];
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") {
        setSideMenu(false);
      }
    };

    if (sideMenu) {
      window.addEventListener("keydown", close);
    }

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [sideMenu]);

  return (
    <>
      <div
        className={`   ${
          sideMenu ? "fixed h-screen w-screen z-10 bg-transparent" : "hidden"
        }`}
        onClick={() => {
          setSideMenu(false);
        }}
      ></div>
      <div
        className={`  fixed ${
          sideMenu ? "flex" : "hidden"
        }  z-30 items-center gap-5 flex-col  p-6  left-0 top-0 h-screen  w-1/2 bg-gray-100`}
      >
        {headers?.map((header, i) => {
          if (header.title === "Home") {
            return (
              <Link
                key={i}
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
                className={`${
                  path.pathname === header.link
                    ? "w-full   p-3 rounded-md flex gap-6 items-center text-white font-bold bg-slate-400"
                    : "w-full bg-slate-300 p-3 rounded-md flex gap-6 items-center "
                }`}
                key={i}
                to={header.link}
                onClick={() => {
                  setSideMenu(!sideMenu);
                }}
              >
                {header.logo}

                <h1
                //  className={`${path.pathname === header.link  ? 'font-bold bg-red-500' : '' }`}
                // className={`hover:text-blue-600 text-bold text-[20px] leading-[10px] ${
                //   path.pathname === header.link &&
                //   " underline underline-offset-8"
                // }  hover:underline hover:underline-offset-8 py-3`}
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
                <Link key={i} to={header.link}>
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
