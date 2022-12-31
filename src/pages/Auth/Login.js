import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { signIn, setLoading, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        const currentUser = { email: user.email };
        if (user.uid) {
          fetch(`https://social-spark.vercel.app/jwt`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem("user_token", data.token);
              navigate(from, { replace: true });
              setLoading(false);
              toast.success("login successful");
            });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
    if (loading) return <Loader />;
  };

  return (
    <div>
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="p-8 flex flex-col gap-2 justify-center items-center shadow-lg rounded-xl text-center bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline text-cyan-600 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
            <h3 className="text-1xl font-semibold text-gray-500">
              Sign in to your account!
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="text-left pt-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-2 rounded-md bg-gray-100 shadow-md focus:outline-none  border-gray-900"
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="block p-2 mt-3 rounded-md bg-gray-100 shadow-md focus:outline-none  border-gray-900"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 p-2 pr-5 pl-5 text-white font-semibold rounded-xl border-gray-900  m-4"
              >
                Sign In
              </button>
            </form>
            <SocialLogin />
            <p className="text-base text-[#adadad]">
              Not a member yet?
              <Link to="/register" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
