import { Link, useNavigate } from "react-router-dom";
import signup from "../../../assets/signup.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { useDispatch, useSelector } from "react-redux";
import { getStatus, signUpUser } from "../../../feature/user/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const status = useSelector(getStatus);

  const loading = status === 'loading' || false

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleSignUp = async (formData) => {
    const user = {...formData, userRole: 'regular', bookmarkedAds: []}
    try{
      await dispatch(signUpUser(user)).unwrap();
      navigate('/login')
    } catch (err){
      setError("root.random", {
        type: "random",
        message: err
      })
    }
    
  };

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen container mx-auto px-6 flex items-center justify-center">
        {/* signup banner */}
        <div className="w-1/2 hidden md:block">
          <img src={signup} alt="" />
        </div>
        <div className="w-full md:w-1/2 rounded px-8 pt-6 pb-8 mb-4">
          {/* page title */}
          <h1 className="text-center text-3xl mb-6 py-8">
            Sign up for an account
          </h1>

          {/* oauth */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <button className="text-sm border py-2 px-4 rounded w-full md:w-1/2 flex items-center justify-center gap-2 hover:bg-slate-200">
              <FcGoogle size="1.5rem" />
              Sign Up with Google
            </button>
            <button className="text-sm border py-2 px-4 rounded w-full md:w-1/2 flex items-center justify-center gap-2 hover:bg-slate-200">
              <FaFacebook size="1.5rem" color="#0866FF" />
              Sign Up with Facebook
            </button>
          </div>

          {/* divider */}
          <div className="flex items-center justify-between py-8">
            <div className="w-auto md:w-1/3 h-[1.5px] bg-slate-300"></div>
            <p className="text-slate-400">or with email</p>
            <div className="w-auto md:w-1/3 h-[1.5px] bg-slate-300"></div>
          </div>

          {/* root error */}
          {errors?.root?.random && (
            <p className="bg-red-100 text-red-500 py-2 my-5 text-center rounded">
              {errors?.root?.random?.message}!
            </p>
          )}

          {/* form */}
          <form className="mb-4" onSubmit={handleSubmit(handleSignUp)}>
            {/* username */}
            <Field error={errors.username}>
              <input
                className={`bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black ${errors?.username ? 'focus:border-red-500 border-red-500' : ""}`}
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required to sign up",
                })}
              />
            </Field>

            {/* email */}
            <Field error={errors.email}>
              <input
                className={`bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black ${errors?.email ? 'focus:border-red-500 border-red-500' : ""}`}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required for sign up",
                })}
              />
            </Field>

            {/* password */}
            <Field error={errors.password}>
              <input
                className={`bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black ${errors?.password ? 'focus:border-red-500 border-red-500' : ""}`}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password can't be empty",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 character or more.",
                  },
                })}
              />
            </Field>

            {/* confirm password */}
            {/* <Field error={errors.confirmPassword}>
              <input
                className="bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Password can't be empty",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 character or more.",
                  },
                })}
              />
            </Field> */}

            {/* submit button */}
            <div className="flex flex-col items-center justify-between">
              <button
                className="bg-slate-600 hover:bg-slate-700 w-full text-white font-bold py-2 px-4 rounded my-4 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {loading ? "signing up..." : "Sign Up"}
              </button>
              <span className="inline-block align-baseline text-sm">
                Already have an account?{" "}
                <Link className="text-blue-400 font-bold" to="/login">
                  Log In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
