import {useState,useEffect} from 'react'
import Navbar from './Navbar';
import { db} from '../config/Firebase';
import { getDocs ,collection  } from 'firebase/firestore';
import { getDownloadURL , ref, listAll } from 'firebase/storage';
import { store } from '../config/Firebase';

export default function OrderDetails() {
    const [orders, seOrders] = useState([]);
    const [images , setImages] = useState([]);
    const getOrders = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "Orders"));
          const OrdersData = [];
          querySnapshot.forEach((doc) => {
            OrdersData.push({ id: doc.id, ...doc.data() });
          });
          seOrders(OrdersData);
         
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      }
     
      const handleImage = async () => {
        try {
            const listRef = ref(store, "Book");
            const res = await listAll(listRef);
            const promises = res.items.map((item) => getDownloadURL(item));
            const urls = await Promise.all(promises);
            setImages(urls);
            
          } catch (error) {
            console.error("Error fetching images:", error);
          }
      
    };
      useEffect(() => {
        getOrders();
        handleImage();
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
        <th></th>
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
            <button className="btn btn-ghost btn-xs">details</button>
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
        <th></th>
      </tr>
    </tfoot>
    
  </table>
</div>

    </>
  )
}
