import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { login } from "../../../services/operations/admin";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    login(formData.email, formData.password, navigate, dispatch);
  };

  return (
    <>
      <Link
        className="bg-blue-400  flex items-center w-fit px-10 py-4 gap-3 font-bold text-sm"
        to="/"
      >
        <FaArrowLeftLong />
        <p>Back to Home</p>{" "}
      </Link>

      <div className="flex items-center justify-center h-[87vh] ">
        <div className="bg-gray-300 hover:bg-gray-200 p-8 rounded-lg shadow-lg lg:w-[25%] h-auto">
          <h2 className="text-3xl text-center font-semibold mb-4">Login</h2>
          <div className="border border-b-2 border-blue-600 my-3"></div>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                required
                placeholder="Enter email"
                className="mt-1 p-2 block w-full border rounded-md h-[50px] text-2xl"
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                id="password"
                required
                placeholder="Enter Password"
                className="mt-1 p-2 block w-full border rounded-md h-[50px] text-2xl"
                onChange={handleOnChange}
              />
              <div
                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-xl cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-6 mt-4 text-xl py-2 bg-blue-400 rounded-md"
                type="submit"
              >
                Login
              </button>
              <Link to="/register" className=" text-xl mt-3 text-blue-600">
                Not Have Account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
