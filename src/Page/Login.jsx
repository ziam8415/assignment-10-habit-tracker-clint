import React, { useState, useContext } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn, Github } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { singInUser, singInWithGoogle } = useContext(AuthContext);
  //const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const validatePassword = (value) => {
  //   const newErrors = [];

  //   if (value.length < 6)
  //     newErrors.push("Password must be at least 6 characters long");
  //   if (!/[A-Z]/.test(value))
  //     newErrors.push("Must contain at least one uppercase letter");
  //   if (!/[a-z]/.test(value))
  //     newErrors.push("Must contain at least one lowercase letter");

  //   setErrors(newErrors);
  // };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    //validatePassword(value);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    singInUser(email, password)
      .then((result) => {
        e.target.reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User login successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(location?.state || "/");
      })
      .catch((error) => {
        //console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong!!",
          showConfirmButton: false,
          timer: 1500,
        });

        e.target.reset();
      });
  };

  const handelGoogleSingIn = () => {
    singInWithGoogle()
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User login successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || "/");
      })
      .catch((e) => {
        //console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 1500,
        });

        //window.location.reload();
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md my-15 rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <LogIn className="w-10 h-10 mx-auto text-pink-500" />
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Login to your account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handelLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Messages */}
          {/* {errors.length > 0 && (
            <ul className="text-sm text-red-500 space-y-1">
              {errors.map((error, i) => (
                <li key={i}>⚠️ {error}</li>
              ))}
            </ul>
          )} */}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-pink-500 hover:bg-pink-600 text-white border-none flex items-center gap-2"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handelGoogleSingIn}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <svg
            aria-label="Google logo"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="#EA4335"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248C504 119 393 8 256 8zm121 269H264v-62h113c-4-25-17-46-37-61v-1l53-52c33 30 52 74 52 125 0 15-2 30-5 44z"
            />
            <path
              fill="#34A853"
              d="M264 504c64 0 118-21 157-58l-53-51c-15 10-34 16-55 16-42 0-77-28-90-66h-1l-56 43c32 65 99 108 174 108z"
            />
            <path
              fill="#FBBC05"
              d="M119 315c-8-24-12-49-12-75s4-51 12-75l56 43c-3 9-5 20-5 32s2 23 5 32z"
            />
            <path
              fill="#4285F4"
              d="M264 102c35 0 66 12 91 35l-54 53c-9-6-21-10-37-10-31 0-58 21-68 49h-1l-56-43h-1c23-46 71-84 126-84z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Sign Up Link */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/singUp" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
