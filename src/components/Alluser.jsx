import {useState,useEffect} from 'react'
import Navbar from './Navbar';
import { db} from '../config/Firebase';
import { getDocs ,collection,deleteDoc ,doc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { store } from '../config/Firebase';
import Swal from 'sweetalert2';
import { deleteObject } from 'firebase/storage';
import { getAuth,deleteUser } from 'firebase/auth';

export default function Alluser() {
    const [users, setUsers] = useState([]);
    
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
     const handleDeleteUser = async (id) => {
      Swal.fire({
        title: "ต้องการลบข้อมูลผู้ใช้หรือไม่?",
        icon: "info",
        showConfirmButton: true,
        showCancelButton: true,
      }).then(async(result) => {
        if (result.isConfirmed) {
        try {
          getAuth().deleteUser(id);
          await deleteDoc(doc(db, "Users", id));
          const imageRef = ref(store, `Users/${id}.jpg`);
          await deleteObject(imageRef);
          getUsers();
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      }else if(result.isDenied){
        return;
      }})
        
     }
      
      useEffect(() => {
        getUsers();
       
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
                  <img src={user.image} alt="" />
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
            <button className="btn btn-error" onClick={() => handleDeleteUser(user.id)}>Delete</button>
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
