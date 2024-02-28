import { Link } from "react-router-dom";
import login from "../../../assets/login.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { logInUser } from "../../../feature/user/userSlice";

const LogIn = () => {
  // const dispatch = useDispatch();



  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   const email = e.target.name.email;
  //   const pass = e.target.name.password

  //   console.log('logging in')
  //   const data = {
  //     name: "Joy",
  //     email: "joy@gmail.com",
  //     password : "alksdjflkdaf",
  //     userRole : "admin"
  //   }

  //   await dispatch(logInUser(data)).unwrap();
  //   console.log('hello');
  // }
  
  return (
    <div className="bg-gray-100">
      <div className="min-h-screen container mx-auto px-6 flex items-center justify-center">
        <div className="w-1/2 hidden md:block">
          <img src={login} alt="" />
        </div>
        <div className="w-full md:w-1/2 rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-center text-3xl mb-6 py-8">
            Log in to Basa Lagbe
          </h1>
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
          <form className="mb-4">
            <div className="mb-5">
              <input
                name="email"
                className="bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-5">
              <input
                name="password"
                className="bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="mb-5">
              <input
                className="bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="flex flex-col items-center justify-between">
              <button
                className="bg-slate-600 hover:bg-slate-700 w-full text-white font-bold py-2 px-4 rounded my-4 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log in
              </button>
              <span
                className="inline-block align-baseline text-sm"
              >
                Don&apos;t have an account? <Link className="text-blue-400 font-bold" to='/signup'>Sign Up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
