import React from "react";
import Navbar from "./Navbar";
import { Link ,useNavigate} from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import Swal from 'sweetalert2';
import { store } from "../config/Firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function Insert() {
  const [name, setName] = React.useState("");
  const [story, setStory] = React.useState("");
  const [publisher, setPublisher] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image , setImage] = React.useState("");
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name|| !story || !publisher || !price || !category || !image ){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "กรุณากรอกข้อมูลทุกช่อง",
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    Swal.fire({
      title: "ต้องการบันทึกข้อมูลหรือไม่?",
      icon: "info",
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          
          const docRef = await addDoc(collection(db, "Book"), {
            name: name,
            story: story,
            publisher: publisher,
            price: price,
            category: category,
            
          });
          
          const imageRef = ref(store, `Book/${docRef.id}.jpg`);
          uploadBytes(imageRef, image);
          Swal.fire("Saved!", "", "success").then(() => {
            navigate("/homepage");
          });
          
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
      } else if (result.isDenied) {
        return;
      }
    });


    
  }
 
  return (
    <>
      <Navbar />
      <div className="h-calc[(100vh-100px)]">
        <div className="flex justify-center my-10">
          <h1 className="text-2xl btn btn-outline btn-primary btn-active">เพิ่มรายการหนังสือ</h1>
        </div>
        <div className="flex  justify-center items-center  ">
          <div className="grid grid-cols-2  gap-x-10 gap-y-20">
            <label className="input input-bordered flex items-center gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
              <input type="Text" className="grow" placeholder="ชื่อหนังสือ" value={name} onChange={(e) => setName(e.target.value)} required/>
            </label>
            <label className="input input-bordered  flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                />
              </svg>

              <input type="Text" className="grow " placeholder="เรื่องย่อ" value={story} onChange={(e) => setStory(e.target.value)} required/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>

              <select className="select  select-sm w-full max-w-xs" value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option   selected>หมวดหมู่</option>
                <option value="นิยาย">นิยาย</option>
                <option value="การ์ตูน">การ์ตูน</option>
                <option value="อีบุ๊ก">อีบุ๊ก</option>
                <option value="หนังสือเด็ก">หนังสือเด็ก</option>
                <option value="หนังสือเรียน">หนังสือเรียน</option>
              </select>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>

              <input type="Text" className="grow" placeholder="สำนักพิมพ์" value={publisher} onChange={(e) => setPublisher(e.target.value)} required/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <input type="Text" className="grow" placeholder="ราคา" value={price} onChange={(e) => setPrice(e.target.value)} required/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <input
                type="file"
                className="file-input file-input-ghost max-w-xs"
                onChange={(e) => setImage(e.target.files[0])}
                required/>
            </label>

            <Link
              className="btn btn-secondary btn-outline w-full  text-xl"
              to="/homepage"
            >
              ย้อนกลับ
            </Link>
            <button className="btn btn-primary w-full  text-xl" onClick={handleSubmit}>บันทึก</button>
            
          </div>
        </div>
      </div>
    </>
  );
}
