import {useState,useEffect} from 'react'
import Navbar from './Navbar';
import { db} from '../config/Firebase';
import { getDocs ,collection ,query,orderBy,deleteDoc,doc } from 'firebase/firestore';

import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function OrderDetails() {
    const [orders, seOrders] = useState([]);
    const [loading ,setLoading] =useState(true);
    const location = useLocation();
    const [selectedOrders, setSelectedOrders] = useState([]);
    
    const handleDelete = ()=>{
      for(const item in selectedOrders){
        const docRef = doc(db, "Orders", selectedOrders[item]);
        deleteDoc(docRef);
      }
      setSelectedOrders([]);
      getOrders();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "ลบข้อมูลสําเร็จ",
        showConfirmButton: false,
        timer: 1500,
      })
    }
    const getOrders = async () => {
        try {
          const docRef = collection(db, "Orders");
          const q = query(docRef, orderBy("date", "desc"));
          const querySnapshot = await getDocs(q);
          const OrdersData = [];
          querySnapshot.forEach((doc) => {
            OrdersData.push({ id: doc.id, ...doc.data() });
          });
          seOrders(OrdersData);
         
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      }
      const toggleSelection = (id) => {
        setSelectedOrders((prevSelected) =>
          prevSelected.includes(id)
            ? prevSelected.filter((orderId) => orderId !== id)
            : [...prevSelected, id]
        );
      };
      
 
      
      useEffect(() => {
        getOrders().then(()=>setLoading(false))
        
      }, [location]);
  return (
    <>
    <Navbar/>
    {loading ? (
 <div className='flex items-center justify-center w-[100vw] h-[100vh]'>
 <button className='btn btn-primary'>
 <span className="loading loading-spinner loading-lg"></span>
 </button>
</div>
    ):(
      <>
      <div className='m-6 flex items-center justify-between'>
      <button
            className="btn btn-secondary btn-outline mb-4"
            onClick={handleDelete}
            disabled={selectedOrders.length === 0}
          >
            ยกเลิกออเดอร์ที่เลือก
          </button>
          
      </div>
     
      
          <div className="overflow-x-auto m-10">
        
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                 
                </label>
              </th>
              <th>Receiver</th>
              <th>Address</th>
              <th>Phone</th>
              <th>BookName</th>
              <th>Image</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
           
              {orders.map((ord) => (
                <tr key={ord.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox"  
                            onChange={() => toggleSelection(ord.id)} />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    
                    <div>
                      <div className="font-bold">{ord.receiver}</div>
                      
                    </div>
                  </div>
                </td>
                <td>
                  {ord.address}
                </td>
                <td>{ord.phone}</td>
                <td>{ord.book_name}</td>
                <div className="avatar">
                      <div className="mask mask-squircle w-24 h-24">
                        <img src={ord.image} alt="" />
                      </div>
                    </div>
                <td>{ord.quantity}</td>
                <th>
                  <button className={`btn ${ord.status === "รอชำระเงิน" ? "btn-warning" : "btn-success"}`}> {ord.status}</button>
                 
                </th>
              </tr>
            ))
            }
            
            
           
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Receiver</th>
              <th>Address</th>
              <th>Phone</th>
              <th>BookName</th>
              <th>Image</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </tfoot>
          
        </table>
      </div>
     
      </>
   
    )}
   

    </>
  )
}
