import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db ,store} from "../config/Firebase";
import Swal from 'sweetalert2';
import {  ref, deleteObject } from "firebase/storage";
import { Link } from "react-router-dom";
export default function ProductCard(props) {
  const handleDelete = async()=>{
    const imageRef = ref(store, `Book/${props.id}.jpg`);
    Swal.fire({
      title: "ต้องการลบข้อมูลหรือไม่?",
      icon: "info",
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       await deleteObject(imageRef);
        await deleteDoc(doc(db, "Book", props.id)).then(()=>{
          Swal.fire("Deleted!", "", "success");
          window.location.reload();

        })
       
      } else if (result.isDenied) {
        return;
      }})
  }

  return (
    <>
    
  <div className="card w-96 bg-base-100 shadow-xl">
    <figure>
      <img src={props.image} alt={props.name} />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{props.name}</h2>
      <p className="truncate ">{props.story}</p>
      <div className="card-actions justify-end">
      <Link to={`/homepage/edit/${props.id}`} className="btn btn-outline btn-info" role="button">แก้ไข</Link>
      <button className="btn btn-outline btn-accent " onClick={handleDelete}>ลบ</button>
        <button className="btn btn-primary">{props.price} บาท</button>
      </div>
    </div>
  </div>
  </>
  );
}
