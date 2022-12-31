import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import avater from "../../assets/avater.png";
const PostDetails = () => {
  const { user } = useContext(AuthContext);
  const singlePost = useLoaderData();
  const { email, photoURL, displayName } = user;
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState({});
  const [db, setDb] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/comments/`)
      .then((res) => res.json())
      .then((data) => setDb(data));
  }, [user]);
  const filterComment = db?.filter((i) => i.reviewId === singlePost._id);
  const totalLikes = singlePost.userLikes.reduce((a, b) => a + b.like, 0);
  const handleLike = (id) => {
    setLikeCount(likeCount + 1);

    axios
      .put(`${process.env.REACT_APP_SERVER_BASE_URL}/allpost/${id}`, {
        likeCount,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/allpost/${singlePost._id}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(comments),
      }
    )
      .then((res) => res.json())
      .then((data) => {});

    e.target.reset();
  };
  const handleInputRev = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setComments({
      ...comments,
      email,
      photoURL,
      displayName,
      timeStamp: moment().format("LLL"),
      [name]: value,
      reviewId: singlePost._id,
    });
  };

  return (
    <div>
      <div>
        <div key={singlePost._id} className="bg-gray-100 px-14 py-8">
          <div className="bg-white border rounded-sm ">
            <div className="flex items-center px-4 py-3">
              <img
                className=" w-10 h-10 rounded-full"
                src={singlePost.userImage}
                alt=""
              />
              <div className="ml-3 ">
                <span className="text-sm font-semibold antialiased block leading-tight">
                  {singlePost.userName}
                </span>
                <span className="text-gray-600 text-xs block">
                  {singlePost.createdAt}
                </span>
                <p>{singlePost.postDeccription}...</p>
              </div>
            </div>
            <img
              className="h-[300px] object-cover w-full cover"
              src={singlePost.postImg}
              alt=""
            />
            <div className="flex items-center justify-between mx-4 mt-3 mb-2">
              <div className="flex gap-3 items-center">
                <AiOutlineHeart
                  onClick={() => handleLike(singlePost._id)}
                  className="text-[30px] cursor-pointer"
                />
                <div className="font-semibold text-sm  ">
                  {totalLikes} likes
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex w-1/2 flex-col gap-2">
              <textarea
                required
                name="comment"
                onChange={handleInputRev}
                type="text"
                className="border-[1px] border-gray-400 p-3"
                placeholder="add comments"
              />
              <button
                type="submit"
                className="bg-gray-900 w-1/3  text-white px-3  rounded-xl"
              >
                add
              </button>
            </form>
            <span className="px-4"> {filterComment.length} Comments</span>
            {filterComment.map((cmnt) => (
              <div key={cmnt._id} className="flex flex-col  pb-4 px-4">
                <div className="flex">
                  <div>
                    <img
                      className="w-8 rounded-full"
                      src={cmnt.photoURL ? cmnt.photoURL : avater}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold">
                      {cmnt.displayName}
                    </h4>
                    <span className="text-[11px]">{cmnt.timeStamp}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-[15px]">{cmnt.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
