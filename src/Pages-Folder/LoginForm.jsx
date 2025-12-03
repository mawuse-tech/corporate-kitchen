import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux-Store/Features/Auth-Folder/authActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaUserShield, FaEnvelope, FaLock, FaSignInAlt, FaSpinner } from "react-icons/fa";
import ShowHidePassword from "../SharableComponents-Folder/ShowHidePassword";
import Button from "../SharableComponents-Folder/Button";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const hasNavigated = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (user && !hasNavigated.current) {
      hasNavigated.current = true; 
      toast.success("Login successful!");
      navigate("/settings");
    }

    if (error) {
      toast.error(error);
    }
  }, [user, navigate, error]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f7eaf1]">

      <div className="flex-col justify-start">
        <p className="text-[1rem] text-[#4f1e72] mt-8 mb-3">
          <span className="font-extrabold"> CORPORATE</span> KITCHENS
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 border-4 border-blue-200 min-h-screen"
      >

        <p className="text-3xl pt-20 mb-4">Log In</p> 
        <div className="space-y-4">
          <div>
            <div>
              <span className="flex items-center">
              </span>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-2 pr-4 py-3 border border-gray-300 transition duration-150 ease-in-out placeholder-gray-500 text-gray-900"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div>
              <span className="flex items-center pl-3">
              </span>
              <ShowHidePassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

            </div>
          </div>
        </div>

        <Button className=""
          type="submit"
          loading={loading}           
          loadingText="Logging in..."          
          loadingIcon={FaSpinner}     
        >
          Login
        </Button>

      </form>
    </div>

  );
};

export default LoginForm;