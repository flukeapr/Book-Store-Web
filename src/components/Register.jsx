import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthenContext";
import Swal from "sweetalert2";
import { db, store } from "../config/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";


export default function Register() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const [image, setImage] = React.useState("");
  const [error, setError] = useState("");
  const [Check, setCheck] = useState(false);
  const { sigUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!fullName || !Address || !Phone || !Email || !Password) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "กรุณากรอกข้อมูลทุกช่อง",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (!Check) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณายอมรับเงื่อนไขส่วนบุคคล",
        timer: 1500,
      });
      return;
    }
    try {
      await sigUp(Email, Password).then(async(cred) => {
        const docRef = doc(db, "Users", cred.user.uid);
        setDoc(docRef, {
          fullName: fullName,
          address: Address,
          phone: Phone,
        });
        const storageRef = ref(store, `Users/${cred.user.uid}.jpg`);
      await uploadBytes(storageRef, image);
      })
      Swal.fire({
        title: "สมัครสมาชิกสําเร็จ",
        text: "ยินดีต้อนรับเข้่าสู่ระบบ",
        icon: "success"
      });
      
      navigate("/login");
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <div className="h-[calc(100vh-245px)]">
        <div className="flex flex-col justify-center mx-2 my-10">
          <div className="flex justify-center items-center">
            <img src="Logo.png"></img>
          </div>

          <div className="my-4 flex flex-col items-center">
            {error && (
              <div role="alert" className="alert alert-error w-1/2">
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
                <span>{error}</span>
              </div>
            )}

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

              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
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

              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-2 w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#CE4257"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="FullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
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
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <input
                type="text"
                className="grow"
                placeholder="Address"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
              />
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>

              <input
                type="tel"
                className="grow"
                placeholder="Phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
              />
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
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <input
                type="file"
                className="file-input file-input-ghost max-w-xs"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            <div className="flex text-center  my-4 ">
              <input
                type="checkbox"
                className="checkbox [--chkbg:oklch(var(--a))] mx-2"
                value={Check}
                onChange={(e) => setCheck(e.target.checked)}
              />
              I accept the Terms of Use & Privacy Policy
            </div>

            <button
              className="btn btn-primary w-1/2 text-xl"
              onClick={handleSubmit}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
      <img src="layer.png"></img>
    </>
  );
}
