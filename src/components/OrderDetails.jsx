import {useState,useEffect} from 'react'
import Navbar from './Navbar';
import { db} from '../config/Firebase';
import { getDocs ,collection ,query,orderBy } from 'firebase/firestore';
import { getDownloadURL , ref, listAll } from 'firebase/storage';
import { store } from '../config/Firebase';

export default function OrderDetails() {
    const [orders, seOrders] = useState([]);
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
     
      
      useEffect(() => {
        getOrders();
        
      }, []);
  return (
    <>
    <Navbar/>
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
              <input type="checkbox" className="checkbox" />
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
      ))}
      
     
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
  )
}
