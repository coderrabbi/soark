import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.log(err));
  }, [user.email]);

  return (
    <div>
      <div class="max-w-2xl mx-auto">
        <div class="px-3 py-2">
          <div class="flex flex-col gap-1 text-center">
            <img
              src="https://pbs.twimg.com/profile_images/1494937378179653632/Vu5-upyx_reasonably_small.jpg"
              className="w-[100px] mx-auto rounded-full"
              alt=""
            />
            <div className="flex  flex-col">
              <p class="font-serif font-semibold">{user.displayName}</p>
              <span class="font-serif ">{userData.email}</span>
              <span class="text-sm text-gray-400">{userData.address}</span>
              <span class="text-sm text-gray-400">{userData.university}</span>
            </div>
          </div>

          <div class="flex justify-center gap-2 my-5">
            <button class="bg-gray-900 px-10 py-2 rounded-full text-white shadow-lg">
              Edit Profile
            </button>
            <button class="bg-white border border-gray-500 px-10 py-2 rounded-full shadow-lg">
              Message
            </button>
          </div>

          {/* <div class="grid grid-cols-3 gap-2 my-3">
            <a
              class="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
              href=""
              style="background-image: url('https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg')"
            ></a>
            <a
              class="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
              href=""
              style="background-image: url('https://images.pexels.com/photos/247287/pexels-photo-247287.jpeg')"
            ></a>
            <a
              class="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
              href=""
              style="background-image: url('https://images.pexels.com/photos/6169/woman-hand-girl-professional.jpg')"
            ></a>

            <a
              class="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
              href=""
              style="background-image: url('https://images.pexels.com/photos/3851790/pexels-photo-3851790.jpeg')"
            ></a>
            <a
              class="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
              href=""
              style="background-image: url('https://images.pexels.com/photos/3852159/pexels-photo-3852159.jpeg')"
            ></a>
            <a
              class="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
              href=""
              style="background-image: url('https://images.pexels.com/photos/4491173/pexels-photo-4491173.jpeg')"
            ></a>

            <a
              class="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
              href=""
              style="background-image: url('https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg')"
            ></a>
            <a
              class="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
              href=""
              style="background-image: url('https://images.pexels.com/photos/6019812/pexels-photo-6019812.jpeg')"
            ></a>
            <a
              class="block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg"
              href=""
              style="background-image: url('https://images.pexels.com/photos/40751/running-runner-long-distance-fitness-40751.jpeg')"
            ></a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
