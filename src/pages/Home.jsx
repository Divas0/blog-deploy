import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

function Home() {
  const userData = useSelector((state) => state.auth.status);
  console.log(userData);

  return (
    <>
      {userData === false ? (
        <div className="w-full  h-screen mt-8 bg-gradient-to-r from-[#111113] to-[#010101] ">
          <div  className="w-full  h-[300px] text-center ">
            <p className="inline-block mt-[160px] text-center  text-7xl font-bold  bg-gradient-to-r from-blue-900 via-green-200 to-indigo-400  text-transparent bg-clip-text">
              {" "}
              Express your Thoughts 
            </p>
            <div className="text-white text-center text-2xl mt-[20px] font-mono"> Share and Find Intresting blogs </div>
            <button className="px-[22px] bg-orange-500 mt-[30px] hover:scroll-m-6 hover:bg-green-600 rounded-lg py-[12px] font-bold text-2xl text-gray-300 "> Explore </button>
            
            </div>
        </div>
      ) : (
        <h1> Welcome</h1>
      )}
    </>
  );
}

export default Home;
