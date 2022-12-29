import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLoaderData } from "react-router-dom";
import PostComments from "../../components/PostComments/PostComments";
import { AuthContext } from "../../context/AuthProvider";

const AllPost = () => {
  const allPost = useLoaderData();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, [user?.email]);
  const handleLike = (id) => {
    setLike(!like);
    if (like) {
      setLikeCount(1);
    } else {
      setLikeCount(0);
    }

    const activity = { userId: userInfo._id, likes: likeCount };
    axios
      .put(`${process.env.REACT_APP_SERVER_BASE_URL}/allpost/${id}`, {
        activity,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {allPost.map((post) => (
        <div key={post._id} className="bg-gray-100 px-14 py-8">
          <div className="bg-white border rounded-sm ">
            <div className="flex items-center px-4 py-3">
              <img
                className=" w-10 h-10 rounded-full"
                src={post.userImage}
                alt=""
              />
              <div className="ml-3 ">
                <span className="text-sm font-semibold antialiased block leading-tight">
                  {post.userName}
                </span>
                <span className="text-gray-600 text-xs block">
                  {post.createdAt}
                </span>
                <p>{post.postDeccription}...</p>
              </div>
            </div>
            <img
              className="h-[300px] object-cover w-full cover"
              src={post.postImg}
              alt=""
            />
            <div className="flex items-center justify-between mx-4 mt-3 mb-2">
              <div className="flex gap-3 items-center">
                <AiOutlineHeart
                  onClick={() => handleLike(post._id)}
                  className="text-[30px] cursor-pointer"
                />
                <div className="font-semibold text-sm  ">
                  {/* {post.userLikes} likes */}
                </div>
              </div>
            </div>
            <PostComments post={post} />

            <div>
              <Link to={`/postdetails/${post._id}`}>
                <span>show all comments</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPost;
