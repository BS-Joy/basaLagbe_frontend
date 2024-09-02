import { Link } from "react-router-dom";
import login from "../../../assets/login.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getStatus,
  logInUser,
  setUserError,
} from "../../../feature/user/userSlice";

const LogIn = () => {
  const [formData, setSetFormData] = useState({
    email: "",
    password: "",
  });
  const errorState = useSelector(getError);
  const status = useSelector(getStatus);
  const loading = status === "loading" || false;
  // const [error, setError] = useState(errorState || false);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSetFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    return () => {
      dispatch(setUserError(null));
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };
      await dispatch(logInUser(data)).unwrap();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div className="bg-gray-100">
      {/* <Toaster /> */}
      <div className="min-h-screen container mx-auto px-6 flex items-center justify-center">
        <div className="w-1/2 hidden md:block">
          <img src={login} alt="" />
        </div>
        <div className="w-full md:w-1/2 rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-center text-3xl mb-6 py-8">
            Log in to Basa Lagbe
          </h1>

          {/* 0auth */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <button className="text-sm border py-2 px-4 rounded w-full md:w-1/2 flex items-center justify-center gap-2 hover:bg-slate-200">
              <FcGoogle size="1.5rem" />
              Log In with Google
            </button>
            <button className="text-sm border py-2 px-4 rounded w-full md:w-1/2 flex items-center justify-center gap-2 hover:bg-slate-200">
              <FaFacebook size="1.5rem" color="#0866FF" />
              Log In with Facebook
            </button>
          </div>
          {/* divider */}
          <div className="flex items-center justify-between py-8">
            <div className="w-auto md:w-1/3 h-[1.5px] bg-slate-300"></div>
            <p className="text-slate-400">or with email</p>
            <div className="w-auto md:w-1/3 h-[1.5px] bg-slate-300"></div>
          </div>

          {/* form */}
          {errorState && (
            <p className="bg-red-100 text-red-500 py-2 my-5 text-center rounded">
              {errorState}!
            </p>
          )}
          <form className="mb-4" onSubmit={handleLogin}>
            {/* email */}
            <div className="mb-5">
              <input
                required
                onChange={handleChange}
                name="email"
                className="bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black"
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
              />
            </div>

            {/* password */}
            <div className="mb-5">
              <input
                required
                onChange={handleChange}
                name="password"
                className="bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black"
                id="password"
                type="password"
                placeholder="Password"
                value={formData.pass}
              />
            </div>

            {/* submit button */}
            <div className="flex flex-col items-center justify-between">
              <button
                className="bg-slate-600 hover:bg-slate-700 w-full text-white font-bold py-2 px-4 rounded my-4 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {loading ? "logging in...." : "Log in"}
              </button>
              <span className="inline-block align-baseline text-sm">
                Don&apos;t have an account?{" "}
                <Link className="text-blue-400 font-bold" to="/signup">
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
