import React from "react";
import Navbar from "./Navbar";

export default function Chat() {
  return (
    <>
      <Navbar />
      <div className="w-screen flex">
        <div className="h-[calc(100vh-95px)] p-4  m-2 w-screen flex">
          <div className="w-1/5  border-solid border-2 rounded-xl">
            <div className="w-full h-16 bg-primary rounded-tr-xl rounded-tl-xl">
              <span className="italic flex justify-center items-center h-full text-2xl text-white">
                chat
              </span>
            </div>
            <div className="w-full h-16 flex p-4 items-center">
                <img src="ProfileThumbnail.png" ></img>
                <span className="italic flex justify-center items-center h-full text-2xl text-black">
                    username
                </span>
            </div>
            
          </div>
          <div className="w-4/5 shadow-lg border-solid border-2 mx-2 rounded-xl"></div>
        </div>
      </div>
    </>
  );
}
