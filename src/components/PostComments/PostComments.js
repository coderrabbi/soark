import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import avater from "../../assets/avater.png";
const PostComments = ({ post }) => {
  const { user } = useContext(AuthContext);
  const { email, photoURL, displayName } = user;
  const [comments, setComments] = useState({});
  const [db, setDb] = useState([]);

  const filterComment = db?.filter((i) => i.reviewId === post._id);
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
      reviewId: post._id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://social-spark.vercel.app/allpost/${post._id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(comments),
    })
      .then((res) => res.json())
      .then((data) => {});

    e.target.reset();
  };

  useEffect(() => {
    fetch(`https://social-spark.vercel.app/comments`)
      .then((res) => res.json())
      .then((data) => setDb(data));
  }, [db]);
  return (
    <div>
      <span className="px-4"> {filterComment.length} Comments</span>
      {filterComment.slice(0, 3).map((cmnt) => (
        <div key={cmnt._id} className="flex flex-col  pb-4 px-4">
          <div className="flex">
            <div>
              {" "}
              <img
                className="w-8 rounded-full"
                src={cmnt.photoURL ? cmnt.photoURL : avater}
                alt=""
              />
            </div>
            <div>
              <h4 className="text-[15px] font-semibold">{cmnt.displayName}</h4>
              <span className="text-[11px]">{cmnt.timeStamp}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[15px]">{cmnt.comment}</p>
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex w-1/2  gap-2 px-4 ">
        <input
          required
          name="comment"
          onChange={handleInputRev}
          type="text"
          className="border-[1px] border-gray-400 px-3 py-2"
          placeholder="add comments"
        />
        <div className="flex items-center">
          <button
            type="submit"
            className="bg-gray-900 py-2 text-white px-3  rounded-xl"
          >
            comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostComments;
