import React, { useContext, useEffect, useState } from "react";

import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { AuthContext } from "../../context/AuthProvider";
const Card = () => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/allpost`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
  }, [post]);
  return (
    <div>
      {post.map((p, index) => (
        <div key={index} className="bg-gray-100 px-14 py-8">
          <div className="bg-white border rounded-sm ">
            <div className="flex items-center px-4 py-3">
              <img className=" w-8 rounded-full" src={p.userImg} alt="" />
              <div className="ml-3 ">
                <span className="text-sm font-semibold antialiased block leading-tight">
                  {user.displayName}
                </span>
                <span className="text-gray-600 text-xs block">
                  Asheville, North Carolina
                </span>
                <p>{p.postDeccription.slice(0, 50)}...</p>
              </div>
            </div>
            <img
              className="h-[300px] object-cover w-full cover"
              src={p.postImg}
              alt=""
            />
            <div className="flex items-center justify-between mx-4 mt-3 mb-2">
              <div className="flex gap-5">
                <AiOutlineHeart className="text-[30px] cursor-pointer" />
                <BiComment className="text-[30px] cursor-pointer" />
              </div>
            </div>
            <div className="font-semibold text-sm mx-4 mt-2 mb-4">
              {p.totalLikes}
            </div>
            <span className="px-4"> {p.totalComments} Comments</span>
            <div className="flex gap-3 items-center pb-4 px-4">
              <img
                className="w-8 rounded-full"
                src="https://i.picsum.photos/id/244/900/900.jpg?hmac=w8yBVcv0Y6YdCBm6fe8t21vc_7AnQx4IDszS4vs7Ft8"
                alt=""
              />

              <div className="flex flex-col">
                <h4 className="text-[15px] font-semibold">Golam Rabbi</h4>
                <p className="text-[13px]">hello</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
