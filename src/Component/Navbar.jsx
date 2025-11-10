import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { use } from "react";
import { CircleUser, MailOpen } from "lucide-react";

const Navbar = () => {
  const { user, singOutUser, loading } = use(AuthContext);

  const handelSingOut = () => {
    singOutUser()
      .then(() => {})
      .catch((e) => {
        //console.log(e);
      });
  };

  const link = (
    <div className="space-x-4 font-bold">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/addHabit">Add Habit</NavLink>
      <NavLink to="/myHabits">My Habits</NavLink>
      <NavLink to="/publicHabits">Browse Public Habits</NavLink>
    </div>
  );
  return (
    <div className="navbar bg-base-100 border shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
      <div className="navbar-end">
        <div>
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : user ? (
            <div className="dropdown dropdown-bottom dropdown-end mr-7 ">
              <div tabIndex={0} role="button">
                <img
                  className="w-[50px] h-[50px]  rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-45 p-2 shadow-sm border"
              >
                <li>{user.displayName}</li>
                <li>{user.email}</li>
                <li onClick={handelSingOut}>Sing Up</li>
              </ul>
            </div>
          ) : (
            <div className="">
              <div className=" btn-xs md:btn btn-accent mr-1">
                <Link to="/login">Log In</Link>
              </div>
              <div className=" btn-xs md:btn btn-accent">
                <Link to="/singup">Sing Up</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
