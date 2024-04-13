import {useState,useEffect} from 'react'
import Navbar from './Navbar';
import { db} from '../config/Firebase';
import { getDocs ,collection  } from 'firebase/firestore';
import { getDownloadURL , ref, listAll } from 'firebase/storage';
import { store } from '../config/Firebase';

export default function Alluser() {
    const [users, setUsers] = useState([]);
    const [images , setImages] = useState([]);
    const getUsers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "Users"));
          const UsersData = [];
          querySnapshot.forEach((doc) => {
            UsersData.push({ id: doc.id, ...doc.data() });
          });
          setUsers(UsersData);
         
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      }
     
      const handleImage = async () => {
        try {
            const listRef = ref(store, "Users");
            const res = await listAll(listRef);
            const promises = res.items.map((item) => getDownloadURL(item));
            const urls = await Promise.all(promises);
            setImages(urls);
            
          } catch (error) {
            console.error("Error fetching images:", error);
          }
      
    };
      useEffect(() => {
        getUsers();
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
        <th>FullName</th>
        <th>Address</th>
        <th>Phone</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {users.map((user) => (
          <tr key={user.id}>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={images.find(image => image.includes(user.id))} alt="" />
                </div>
              </div>
              <div>
                <div className="font-bold">{user.fullName}</div>
                
              </div>
            </div>
          </td>
          <td>
            {user.address}
          </td>
          <td>{user.phone}</td>
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
        <th>FullName</th>
        <th>Address</th>
        <th>Phone</th>
        <th></th>
      </tr>
    </tfoot>
    
  </table>
</div>

    </>
   
  )
}
