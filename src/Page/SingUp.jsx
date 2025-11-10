//import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, use } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
// import { auth } from "../Firebase/Firebase.init";

import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

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
    if (!/[0-9]/.test(value))
      newErrors.push("Must contain at least one number");
    if (!/[!@#$%^&*]/.test(value))
      newErrors.push("Must contain at least one special character");

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
        toast.success("User sing up successfully!");
        navigate("/");
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const handelGoogleSingIn = () => {
    singInWithGoogle()
      .then((result) => {
        //console.log(result);
        toast.success("User login successfully!");
        navigate("/");
      })
      .catch((e) => {
        //console.log(e);
        toast.error("Something went wrong!");
        window.location.reload();
      });
  };
  return (
    <div className="flex justify-center items-center flex-col  pt-5">
      <h1 className="text-5xl font-bold pb-5">Sing Up!</h1>
      <div className="card border bg-base-100 w-full max-w-sm shrink-0 pt-10 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handelSingUp}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Your Name"
              />
              {/* photo url */}

              <label className="label">Photo URL</label>
              <input
                type="text"
                name="url"
                className="input"
                placeholder="Photo URL"
              />

              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />

              {/* password */}
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="w-full p-2  rounded"
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

              <ul className="mt-3 text-sm text-red-500">
                {errors.map((error, index) => (
                  <li key={index}>⚠️ {error}</li>
                ))}
              </ul>
              <div>
                Already have an account{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-700">
                  Log in
                </Link>
              </div>
              <button className="btn btn-neutral mt-4">Sing Up</button>
            </fieldset>
          </form>
          <button
            onClick={handelGoogleSingIn}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
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
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
