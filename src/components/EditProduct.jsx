import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { doc, getDoc,setDoc } from "firebase/firestore";
import { db } from "../config/Firebase";


export default function EditProduct() {
  const [name, setName] = React.useState("");
  const [story, setStory] = React.useState("");
  const [publisher, setPublisher] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  
  const getDetail = async () => {
    const docRef = doc(db, "Book", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
     
      setName(docSnap.data().name);
      setStory(docSnap.data().story);
      setCategory(docSnap.data().category);
      setPublisher(docSnap.data().publisher);
      setImage(docSnap.data().image);
      setPrice(docSnap.data().price);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
 const updateData = async () => {
  

 
Swal.fire({
  title: "ต้องการแก้ไขข้อมูลหรือไม่?",
  icon: "info",
  showConfirmButton: true,
  showCancelButton: true,
}).then(async(result) => {
  if (result.isConfirmed) {
    try {
      await setDoc(doc(db, "Book", id), {
        name: name,
        story: story,
        publisher: publisher,
        price: parseFloat(price),
        category: category,
      }) 
      Swal.fire("Saved!", "", "success").then(() => {
        navigate("/homepage");
      });
    } catch (error) {
      console.log(error.message);
    }
  }else if(result.isDenied){
    return;
  }


})
    

 }



  
  useEffect(() => {
    getDetail();
   
  },[]);

    
  return (
    <>
    
      <Navbar />
      <div className="h-calc[(100vh-200px)] ">
      
        <div className="flex justify-center my-10">
        <h1 className="text-4xl font-bold">แก้ไขรายการหนังสือ</h1>
       
        </div>
        
        <div className="flex flex-col justify-center items-center  ">
            <div className="gird grid-cols-2 collapse ">
            <img src={image} className="object-contain ml-auto  h-auto" ></img>
            <div className="grid grid-cols-1 mx-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">ชื่อหนังสือ</span>
              </div>

              <input
                type="Text"
                className="input input-bordered w-full max-w-xs "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">เรื่องย่อ</span>
              </div>

              <input
                type="Text"
                className="input input-bordered w-full max-w-xs"
                value={story}
                onChange={(e) => setStory(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">หมวดหมู่</span>
              </div>

              <input
                type="Text"
                className="input input-bordered w-full max-w-xs"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">สำนักพิมพ์</span>
              </div>

              <input
                type="Text"
                className="input input-bordered w-full max-w-xs"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
             
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">ราคาหนังสือ</span>
              </div>

              <input
                type="Text"
                className="input input-bordered w-full max-w-xs"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>
            </div>
          
        </div>
        
       
        <div className="flex justify-center w-full">
        <div className="flex my-10 w-1/2 justify-center ">
          <Link
            className="btn btn-secondary btn-outline w-1/4 mx-2  text-xl"
            to="/homepage"
          >
            ย้อนกลับ
          </Link>
          <button className="btn btn-primary w-1/4  text-xl" onClick={updateData}>บันทึก</button>
        </div>
        </div>
      </div>
    </>
  );
}


