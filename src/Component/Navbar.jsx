import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { use } from "react";
import { Menu, LogIn, UserPlus, LogOut } from "lucide-react";

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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-gray-800">
            Habit<span className="text-pink-500">Flow</span>
          </h1>
        </div>

        {/* Center Section - Links (Desktop) */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {link || (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold"
                    : "hover:text-pink-400 transition"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/allHabits"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold"
                    : "hover:text-pink-400 transition"
                }
              >
                All Habits
              </NavLink>
              <NavLink
                to="/addHabit"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold"
                    : "hover:text-pink-400 transition"
                }
              >
                Add Habit
              </NavLink>
            </>
          )}
        </div>

        {/* Right Section - User or Auth Buttons */}
        <div className="flex items-center gap-3">
          {loading ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2"
              >
                <img
                  className="w-10 h-10 rounded-full border"
                  src={
                    user.photoURL ||
                    "https://i.ibb.co.com/cSgZvYN9/download.png"
                  }
                  alt="User Avatar"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white border rounded-xl w-56 mt-3 shadow-md p-2"
              >
                <li className="text-gray-700 font-semibold">
                  {user.displayName}
                </li>
                <li className="text-gray-500 text-sm">{user.email}</li>
                <li
                  onClick={handelSingOut}
                  className="text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2 mt-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-700 border-none flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
              <Link
                to="/singUp"
                className="btn btn-sm bg-pink-500 hover:bg-pink-600 text-white border-none flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="p-2">
              <Menu className="w-6 h-6 text-gray-700" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white border rounded-xl w-52 mt-3 shadow-md p-2"
            >
              {link || (
                <>
                  <NavLink to="/" className="hover:text-pink-500">
                    Home
                  </NavLink>
                  <NavLink to="/allHabits" className="hover:text-pink-500">
                    All Habits
                  </NavLink>
                  <NavLink to="/addHabit" className="hover:text-pink-500">
                    Add Habit
                  </NavLink>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
