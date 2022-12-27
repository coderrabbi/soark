import React from "react";

import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
const Card = () => {
  return (
    <div>
      <div className="bg-gray-100 px-14 py-8">
        <div className="bg-white border rounded-sm ">
          <div className="flex items-center px-4 py-3">
            <img
              className=" w-8 rounded-full"
              src="https://picsum.photos/id/1027/150/150"
              alt=""
            />
            <div className="ml-3 ">
              <span className="text-sm font-semibold antialiased block leading-tight">
                8fact
              </span>
              <span className="text-gray-600 text-xs block">
                Asheville, North Carolina
              </span>
            </div>
          </div>
          <img
            className="h-[300px] object-cover w-full cover"
            src="https://picsum.photos/id/244/900/900"
            alt=""
          />
          <div className="flex items-center justify-between mx-4 mt-3 mb-2">
            <div className="flex gap-5">
              <AiOutlineHeart className="text-[30px] cursor-pointer" />
              <BiComment className="text-[30px] cursor-pointer" />
            </div>
          </div>
          <div className="font-semibold text-sm mx-4 mt-2 mb-4">
            92,372 likes
          </div>
          <span className="px-4"> Comments</span>
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
    </div>
  );
};

export default Card;
