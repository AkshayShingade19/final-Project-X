import React, { useEffect, useState } from 'react';
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../redux/userSlice';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && (!name || !username))) {
      return toast.error("Please fill in all fields.");
    }

    setLoading(true);
    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post(`${USER_API_END_POINT}/login`, {
          email,
          password
        }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        });

        if (res.data.success) {
          dispatch(getUser(res.data.user));
          toast.success(res.data.message);
          navigate("/home");
        }

      } else {
        // SIGNUP
        const res = await axios.post(`${USER_API_END_POINT}/register`, {
          name,
          username,
          email,
          password
        }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        });

        if (res.data.success) {
          setIsLogin(true);
          toast.success(res.data.message);
        }
      }

    } catch (error) {
      if (error.response?.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
          <img
            className='ml-5'
            width={"300px"}
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
            alt="twitter-logo"
          />
        </div>
        <div>
          <div className='my-5'>
            <h1 className='font-bold text-6xl'>Happening now.</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>
            {isLogin ? "Login" : "Signup"}
          </h1>
          <form onSubmit={submitHandler} className='flex flex-col w-[55%]'>
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Name'
                  autoComplete="name"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username'
                  autoComplete="username"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
              </>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              autoComplete="email"
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Create Account"}
            </button>
            <h1>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={loginSignupHandler}
                className='font-bold text-blue-600 cursor-pointer'
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
