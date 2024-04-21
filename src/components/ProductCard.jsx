import React from "react";
import { doc, deleteDoc ,addDoc,collection,query,where,updateDoc,increment,getDocs} from "firebase/firestore";
import { db ,store} from "../config/Firebase";
import Swal from 'sweetalert2';
import {  ref, deleteObject } from "firebase/storage";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthenContext";

export default function ProductCard(props) {
  const {user} = useUserAuth();

  
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
          Swal.fire("Deleted!", "", "success").then(()=>{
            window.location.reload();
          })
         

        })
       
      } else if (result.isDenied) {
        return;
      }})
  }
  
  const addToCart = async()=>{
    try {
      const cartRef = collection(db, 'Users', user.uid, 'Cart');
      const q = query(cartRef, where('book_id', '==', props.id));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // หากมีสินค้าอยู่ในตะกร้าอยู่แล้ว
        const docSnap = querySnapshot.docs[0];
        await updateDoc(doc(docSnap.ref.parent.parent, 'Cart', docSnap.id), {
          quantity: increment(1),
          total: increment(props.price) // เพิ่มปริมาณขึ้นทีละ 1
        });
      } else {
        
        // หากไม่มีสินค้าในตะกร้า
        await addDoc(cartRef, {
          book_id: props.id,
          name: props.name,
          image: props.image,
          price: props.price,
          quantity: 1,
          date: new Date(),
          total: props.price
        });
      }
     
      Swal.fire("Added!", "", "success")
    } catch (error) {
      console.error('Error adding to cart: ', error);
    }
    
  }

  return (
    <>
    
  <div className="card w-96 bg-base-100 shadow-2xl border-solid border-2 border-[#8C0327]">
    <figure >
      <img src={props.image} alt={props.name} className="my-2"/>
    </figure>
    <div className="card-body">
      <h2 className="card-title">{props.name}</h2>
      <p className="truncate ">{props.story}</p>
      <div className="card-actions justify-end">
      <Link to={`/homepage/edit/${props.id}`} className="btn btn-outline btn-info" role="button">แก้ไข</Link>
      <button className="btn btn-outline btn-accent " onClick={handleDelete}>ลบ</button>
        <button className="btn btn-primary" onClick={addToCart}>{props.price} บาท</button>
      </div>
    </div>
  </div>
  </>
  );
}
