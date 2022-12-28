import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import UserDetails from "./UserDetails";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [details, setDetails] = useState();
  const [userData, setUserData] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.log(err));
  }, [user.email]);

  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div className="px-3 py-2">
          <div className="flex flex-col gap-1 text-center">
            <img
              src={userData.image ? userData.image : user.photoURL}
              className="w-[100px] h-[100px] object-cover mx-auto rounded-full"
              alt=""
            />
            <div className="flex  flex-col">
              <p className="font-serif font-semibold">{userData.name}</p>
              <span className="font-serif ">{userData.email}</span>
              <span className="text-sm text-gray-400">{userData.address}</span>
              <span className="text-sm text-gray-400">
                {userData.university}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-2 my-5">
            <div className="text-center my-3 relative">
              <label
                htmlFor="my-modal-3"
                onClick={() => setDetails(userData)}
                className="cursor-pointer bg-gray-900 text-white px-4 py-3 rounded-full"
              >
                Edit Profile
              </label>
            </div>
            {details && <UserDetails details={details} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
