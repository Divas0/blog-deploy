import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.status);
  console.log(userData);
  function handleClick() {
    navigate("/all-posts");
  }

  return (
    <>
      {userData === false ? (
        <div className="w-full  h-screen  bg-gradient-to-r from-[#0b0716] to-[#010101] ">
          <div className="w-full  h-[300px] text-center ">
            <p className="inline-block mt-[160px] text-center  text-7xl font-bold  bg-gradient-to-r from-blue-900 via-green-200 to-indigo-400  text-transparent bg-clip-text">
              {" "}
              Express your Thoughts
            </p>
            <div className="text-white text-center text-2xl mt-[20px] font-mono">
              {" "}
              Share and Find Intresting blogs{" "}
            </div>
            <button className="px-[22px] hover:bg-purple-700  hover:text-white  mt-[30px] hover:scroll-m-6 bg-green-600 rounded-lg py-[12px] font-bold text-2xl text-gray-300 ">
              {" "}
              Explore{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen ">
          <h1 className="text-9xl text-center mt-[130px]  bg-gradient-to-r from-blue-900 via-green-200 to-indigo-400 text-transparent bg-clip-text">
            {" "}
            Welcome
          </h1>
          <div className="text-center mt-[20px]">
            {" "}
            <button
              onClick={handleClick}
              className=" px-[20px] py-[13px] font-bold hover:bg-purple-600 bg-green-500 rounded-md text-xl shadow-md text-center"
            >
              {" "}
              View Posts{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
