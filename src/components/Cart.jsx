import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { db } from "../config/Firebase";
import { getDocs, collection,deleteDoc,doc,addDoc,getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthenContext";
import Swal from "sweetalert2";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sumQuantity, setSumQuantity] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);
  const { user } = useUserAuth();
  const [fullName , setFullname] = useState('');
  const [address , setAddress] = useState('');
  const [phone , setPhone] = useState('');
  const navigate = useNavigate();
  const getCart = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "Users", user.uid, "Cart")
      );
      const productsData = [];
      let sumQuantity = 0;
      let sumTotal = 0;
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
        
        sumQuantity += doc.data().quantity;
        sumTotal += doc.data().quantity * doc.data().price;
      });
      setSumQuantity(sumQuantity);
      setSumTotal(sumTotal);
      setProducts(productsData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  const removeFromCart = async (id) => {
    Swal.fire({
      title: "ต้องการลบสินค้าหรือไม่?",
      icon: "info",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            
          await deleteDoc(doc(db, "Users", user.uid, "Cart", id));
          
          Swal.fire("Deleted!", "", "success").then(() => {
            getCart();
          })
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      }else if(result.isDenied){
        return;
      }
    })
    
  }
  const orderItem = async () => {
    Swal.fire({
        title: "ต้องการสั่งซื้อสินค้าหรือไม่?",
        icon: "info",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "สั่งซื้อ",
        cancelButtonText: "ย้อนกลับ",
      }).then(async (result) => {
        if(result.isConfirmed){
            try {
                const docRef  = doc(db, "Users", user.uid);
                const querySnapshot = await getDoc(docRef);
               
               if(querySnapshot.exists()){
                setFullname(querySnapshot.data().fullName);
                setAddress(querySnapshot.data().address);
                setPhone(querySnapshot.data().phone);
                
               }else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }
              
               
                const orderPromises = products.map(async (product) => {
                  await addDoc(collection(db, "Orders"), {
                    user_id: user.uid,
                    book_id: product.id,
                    total: product.total,
                    quantity: product.quantity,
                    status: "รอชำระเงิน",
                    book_name: product.name,
                    image: product.image,
                    receiver: querySnapshot.data().fullName,
                    address: querySnapshot.data().address,
                    phone: querySnapshot.data().phone,
                    date: new Date(),
                  });
                });
            
                await Promise.all(orderPromises);
            
                const deleteCartPromises = products.map(async (product) => {
                  const cartRef = doc(db, "Users", user.uid, "Cart", product.id);
                  
                   await deleteDoc(cartRef);
                });
            
                await Promise.all(deleteCartPromises);
            
                Swal.fire("Order Success!", "", "success").then(() => {
                  navigate("/homepage");
                });
              } catch (error) {
                console.error('Error ordering item: ', error);
              }
        }else if(result.isDenied){
          return;
        }



      })
    
  }


  useEffect(() => {
    getCart().then(() => setLoading(false));
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex justify-center m-10">
          <button className="btn btn-primary">
            <span className="loading loading-spinner"></span>
            loading
          </button>
        </div>
      ) : (
        <>
        <div className="flex justify-center my-2">
            <div className="btn btn-primary btn-outline w-1/5 text-xl"> สินค้าในตะกร้า</div>
           
        </div>
          <div className="flex flex-col  my-4 mx-10 border-solid border-2">
            {products.map((product) => (
              <div
                className="flex  w-full h-1/2"
                key={product.id}
              >
                <div className="flex w-4/5">
                  <img src={product.image}></img>
                  <div className="flex flex-col m-2">
                    <h1 className="text-xl text-[#CE4257]">{product.name}</h1>
                    <h4 className="text-md ">สำนักพิมพ์ {product.publisher}</h4>
                    <h4 className="text-md ">ราคา {product.price}</h4>
                    <h4 className="text-md ">จำนวน {product.quantity}</h4>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button className="btn btn-circle" onClick={() => removeFromCart(product.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full  bg-primary flex items-center justify-around p-2">
            <div>
              <h4 className="text-xl text-center text-[white]">
                จำนวน {sumQuantity}
              </h4>
            </div>
            <div className="flex items-center">
              <h4 className="text-xl text-center text-[white]">
                ราคารวม {sumTotal} บาท
              </h4>
              <button className="btn btn-[white] mx-2" onClick={orderItem}>
                ยืนยันการสั่งซื้อ
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
