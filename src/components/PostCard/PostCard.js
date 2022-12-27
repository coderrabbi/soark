import React from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { GrEmoji } from "react-icons/gr";
const PostCard = () => {
  return (
    <div className="p-6 flex justify-center ">
      <div className="flex flex-col shadow-lg gap-2 border-[1px] border-black p-6 rounded-xl lg:w-[80%] w-full">
        <div>
          <div className="flex gap-2">
            <div>
              <img
                className="w-[50px] rounded-full"
                src="https://pbs.twimg.com/profile_images/1494937378179653632/Vu5-upyx_reasonably_small.jpg"
                alt=""
              />
            </div>

            <textarea
              type="text"
              className="border-[0.75px] rounded-md w-full border-gray-500 p-3"
              placeholder="whats in your mind?"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label>
              <HiOutlinePhotograph
                className="cursor-pointer text-[22px]"
                title="photo"
              />
              <input type="file" class="hidden" />
            </label>
            <GrEmoji className="cursor-pointer text-[22px]" />
          </div>
          <button
            type="submit"
            className=" px-3 rounded-lg bg-gray-900 text-white"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
