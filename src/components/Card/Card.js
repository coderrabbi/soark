import React, { useContext, useEffect, useState } from "react";
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
  }, [user]);

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
    </div>
  );
};

export default Card;
