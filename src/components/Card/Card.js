import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import SingleCard from "../SingleCard/SingleCard";
const Card = () => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/allpost`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
  }, [post]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, [user?.email]);
  const sortedArray = post.reverse();
  return (
    <div>
      {sortedArray.map((p) => (
        <SingleCard p={p} userInfo={userInfo} />
      ))}
      <div className="text-center py-4">
        <Link to="/allpost">
          <button className="bg-gray-900 py-2 px-3 rounded-md text-white ">
            Show All Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
