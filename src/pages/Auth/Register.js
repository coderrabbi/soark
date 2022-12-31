import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import SocialLogin from "../SocialLogin/SocialLogin";
const Register = () => {
  const { createUser, setLoading, updateUser, setUserImg } =
    useContext(AuthContext);

  const [img, setImg] = useState("");
  const handleChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", img);
    const url = `https://api.imgbb.com/1/upload?key=4e617bff24500ed4669c6e33ea216faa`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUserImg(data.data.url);
          const form = e.target;
          const name = form.fullName.value;
          const email = form.email.value;
          const password = form.password.value;
          const userName = form.userName.value;
          const image = data.data.url;
          const university = form.university.value;
          const address = form.address.value;

          createUser(email, password)
            .then((result) => {
              const user = result.user;
              console.log(user);
              setLoading(false);
              const userInfo = {
                displayName: form.userName.value,
              };

              updateUser(userInfo)
                .then(() => {
                  saveUser(userName, email, university, address, image, name);
                })
                .catch((error) => console.log(error));
              toast.success("user created successfully");

              form.reset();
            })
            .catch((error) => console.log(error));
        }
      });

    const saveUser = (userName, email, university, address, image, name) => {
      const user = { userName, email, university, address, image, name };
      fetch(`https://social-spark.vercel.app/users`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {})
        .catch((err) => toast.warning(err.message));
    };
  };
  return (
    <div>
      <div className="flex h-screen ">
        <div className="m-auto w-1/3">
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
            <form onSubmit={handleSubmit} className="w-full px-10">
              <div className="text-left flex flex-col  gap-3 pt-3">
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  required
                  className="p-2 rounded-md bg-gray-100  shadow-md focus:outline-none  border-gray-900"
                />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  className="p-2 rounded-md bg-gray-100 shadow-md focus:outline-none  border-gray-900"
                />
                <input
                  type="text"
                  name="userName"
                  placeholder="User Name"
                  required
                  className="p-2 rounded-md bg-gray-100  shadow-md focus:outline-none  border-gray-900"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="p-2 rounded-md bg-gray-100 shadow-md focus:outline-none  border-gray-900"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  required
                  className="p-2 rounded-md bg-gray-100  shadow-md focus:outline-none  border-gray-900"
                />
                <input
                  type="text"
                  name="university"
                  placeholder="University"
                  required
                  className="p-2 rounded-md bg-gray-100  shadow-md focus:outline-none  border-gray-900"
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  className="block p-2 mt-3 rounded-md bg-gray-100 shadow-md focus:outline-none  border-gray-900"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 p-2 pr-5 pl-5 text-white font-semibold rounded-xl border-gray-900  m-4"
              >
                Sign Up
              </button>
            </form>
            <SocialLogin />
            <p className="text-base text-[#adadad]">
              Already a member?
              <Link to="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
