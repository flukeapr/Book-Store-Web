import {useState,useEffect} from 'react'
import Navbar from './Navbar';
import { Firebase_Auth, db} from '../config/Firebase';
import { getDocs ,collection,deleteDoc ,doc, where, query } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { store } from '../config/Firebase';
import Swal from 'sweetalert2';
import { deleteObject } from 'firebase/storage';
import { getAuth,deleteUser } from 'firebase/auth';
import { useUserAuth } from '../context/UserAuthenContext';

export default function Alluser() {
    const [users, setUsers] = useState([]);
    const {user} = useUserAuth();
    const [loading ,setLoading ] = useState(true);
    const getUsers = async () => {
        try {
          const q = query(collection(db, "Users"),where('uid','!=',user.uid))
          const querySnapshot = await getDocs(q);
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
        getUsers().then(()=>setLoading(false))
       
      }, []);
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
      <div className="overflow-x-auto m-0 bg-white p-10 h-[100vh]">
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
    )}
 

    </>
   
  )
}
