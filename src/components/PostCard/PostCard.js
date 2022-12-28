import React, { useContext, useEffect, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { GrEmoji } from "react-icons/gr";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
// import { toast } from "react-hot-toast";
import moment from "moment";
const PostCard = () => {
  const { user } = useContext(AuthContext);
  const [img, setImg] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const handleChange = (e) => {
    setImg(e.target.files[0]);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, [user?.email]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    formData.append("image", img);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_HOST_KEY}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const postData = {
            postImg: data.data.url,
            image: user.photoURL,
            userImage: userInfo.image,
            postDeccription: e.target.description.value,
            userLikes: [],
            userId: userInfo._id,
            createdAt: moment().format("LLL"),
          };
          fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/allpost`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(postData),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success("successfully Posted");
              form.reset();
            });
        }
      });
  };

  return (
    <div className="p-6 flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-lg gap-2 border-[1px] border-black p-6 rounded-xl lg:w-[80%] w-full"
      >
        <div>
          <div className="flex gap-2">
            <div>
              <img
                className="w-12 h-12 rounded-full"
                src={user.photoURL ? user.photoURL : userInfo?.image}
                alt=""
              />
            </div>

            <textarea
              type="text"
              name="description"
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
              <input
                onChange={handleChange}
                name="file"
                type="file"
                className="hidden"
              />
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
      </form>
    </div>
  );
};

export default PostCard;
