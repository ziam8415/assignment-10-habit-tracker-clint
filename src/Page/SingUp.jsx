//import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, use } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Image as ImageIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
// import { auth } from "../Firebase/Firebase.init";

import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const SingUp = () => {
  const { createUserEP, singInWithGoogle } = use(AuthContext);
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //console.log(createUserEP);
  const navigate = useNavigate();

  const validatePassword = (value) => {
    const newErrors = [];

    if (value.length < 6)
      newErrors.push("Password must be at least 6 characters long");
    if (!/[A-Z]/.test(value))
      newErrors.push("Must contain at least one uppercase letter");
    if (!/[a-z]/.test(value))
      newErrors.push("Must contain at least one lowercase letter");

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handelSingUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserEP(email, password)
      .then((result) => {
        //console.log(result.user);
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
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });

        e.target.reset();
      });
  };

  const handelGoogleSingIn = () => {
    singInWithGoogle()
      .then((result) => {
        //console.log(result);
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
          position: "center",
          icon: "error",
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
        //window.location.reload();
      });
  };
  return (
    <div className="flex justify-center items-center flex-col pt-5 pb-10">
      <div className="card border bg-base-100 w-full max-w-sm shrink-0 pt-10 shadow-2xl rounded-2xl">
        <h1 className="text-4xl text-center text-pink-500 font-bold pb-5">
          Sign Up!
        </h1>
        <div className="card-body">
          <form onSubmit={handelSingUp}>
            <fieldset className="fieldset space-y-3">
              {/* Name */}
              <label className="label flex items-center gap-2 text-gray-700">
                <User size={18} /> Name
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Your Name"
              />

              {/* Photo URL */}
              <label className="label flex items-center gap-2 text-gray-700">
                <ImageIcon size={18} /> Photo URL
              </label>
              <input
                type="text"
                name="url"
                className="input input-bordered w-full"
                placeholder="Photo URL"
              />

              {/* Email */}
              <label className="label flex items-center gap-2 text-gray-700">
                <Mail size={18} /> Email
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />

              {/* Password */}
              <label className="label flex items-center gap-2 text-gray-700">
                <Lock size={18} /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password errors */}
              <ul className="mt-2 text-sm text-red-500">
                {errors.map((error, index) => (
                  <li key={index}>⚠️ {error}</li>
                ))}
              </ul>

              {/* Already have account */}
              <div className="mt-2 text-sm text-gray-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-blue-800 font-medium"
                >
                  Log in
                </Link>
              </div>

              {/* Submit */}
              <button className="btn btn-sm bg-pink-500 hover:bg-pink-600 text-white border-none flex items-center gap-2">
                Sign Up
              </button>
            </fieldset>
          </form>

          {/* Google Sign In */}
          {/* <button className="btn bg-white text-black border border-gray-300 mt-4 w-full flex items-center justify-center gap-2 hover:bg-gray-100">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path fill="#fff" d="M0 0h512v512H0z"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Continue with Google
          </button> */}
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
        </div>
      </div>
    </div>
  );
};

export default SingUp;
