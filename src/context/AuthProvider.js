import React, { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [postDetails, setPostDetails] = useState({});
  const [userImg, setUserImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      return () => unsbscribe();
    });
  }, []);

  const logOut = () => {
    setLoading(true);
    signOut(auth);
  };
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        if (user.uid) {
          setLoading(false);
          toast.success("login sucessfull");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.warning(error);
      });
  };
  const authInfo = {
    createUser,
    signIn,
    logOut,
    user,
    loading,
    updateUser,
    setLoading,
    googleSignIn,
    auth,
    googleProvider,
    setUser,
    userImg,
    setUserImg,
    setPostDetails,
    postDetails,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
