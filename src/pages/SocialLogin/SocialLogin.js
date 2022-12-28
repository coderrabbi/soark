import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { signInWithPopup } from "firebase/auth";
const SocialLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { googleProvider, auth, setUser, setLoading } = useContext(AuthContext);
  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        if (user.uid) {
          setLoading(false);
          navigate(from, { replace: true });
          toast.success("login sucessfull");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.warning(error);
      });
  };
  return (
    <div>
      <p className=" text-base text-[#adadad]">Or Sign in With</p>
      <ul className="-mx-2  flex justify-between">
        <li className="w-full px-2">
          <Link
            onClick={googleSignIn}
            className="flex h-11 items-center justify-center rounded-md bg-[#D64937] hover:bg-opacity-90"
          >
            <FaGoogle className="text-white" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SocialLogin;
