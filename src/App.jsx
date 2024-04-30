import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";

import {  Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllPosts from "./pages/AllPost";
import EditPost from "./pages/EditPost";
import AddPost from "./pages/AddPost";
import Post from "./pages/Post";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { ToastContainer } from "react-toastify";


const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentuser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
          console.log(userData)
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h1> loading...</h1>;
  }
  return (
    <div className=" h-screen w-full text-white  ">
      
      <ToastContainer />
      <Routes>
        <Route  element={<Landing/>}>
          <Route  path="/" element={<Home/>}/>
          <Route path="login" element={<Login />} />

          <Route path="signup" element={<Signup />} />
          <Route path="all-posts" element={<AllPosts />} />
          <Route path="edit-post/:slug" element={<EditPost />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="post/:slug" element={<Post />} />
          </Route>
        
      </Routes>

      
    </div>
  );
};

export default App;
