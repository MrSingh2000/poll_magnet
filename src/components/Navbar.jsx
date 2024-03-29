import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ firebaseApp, mainAuth, regUI }) {
  const user = useSelector((store) => store.user);

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <img
              src={logo}
              alt="LOGO"
              className="w-20 h-20"
            />

            <span className="ml-3 text-xl">Poll Magnet</span>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link to={"/"} className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link to={"/polls"} className="mr-5 hover:text-gray-900">
              Polls
            </Link>
          </nav>
          <Link to={user.userId ? "/dashboard" : "/login"}>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              {user.userId ? "Dashboard" : "Login"}
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        </div>
      </header>
      {<Outlet />}
    </>
  );
}

export default Navbar;
