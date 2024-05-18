import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthenContext";
import BottomLayer from "./BottomLayer";
import Swal from "sweetalert2";

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error,setError] = useState("");
  const {  Login ,user} = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await Login(Email, Password).then(()=>
        Swal.fire({
        title: "เข้าสู่ระบบสำเร็จ",
        text: "ยินดีต้อนรับเข้าสู่ระบบ",
        icon: "success",
      }).then(()=>navigate("/homepage")))
      
      
      
     
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
          setError("");

      },3000);
    }
  }
  return (
    <>
    <div className="h-[calc(100vh-400px)]">
    <div className="flex flex-col justify-center mx-2 my-52 ">
        <div className="flex justify-center items-center">
        <img src="Logo.png"  ></img>
        </div>
        
        <div className="my-12 flex flex-col items-center">
        {Error && <div role="alert" className="alert alert-error w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{Error}</span>
        </div>}
        <label className="input input-bordered flex items-center  gap-2 my-2 w-1/2">
        <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#CE4257"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
        <input type="text" className="grow" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
      </label>
     
      <label className="input input-bordered flex items-center gap-2 my-2 w-1/2">
      <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#CE4257"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                />
              </svg>
        <input type="password" className="grow" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button className="btn btn-primary w-1/2 my-2" onClick={handleSubmit}>LOGIN</button>
      <div className="flex my-4">
      <p>Not have Accout</p><Link to="/register"><h4 className="pl-2 text-md text-red-500">Register?</h4></Link>
      </div>
      
        </div>
        
       
       
    </div>
    </div>
     <BottomLayer/>
     </>
  );
}
