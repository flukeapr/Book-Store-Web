import { useEffect,useState } from 'react'
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { useUserAuth } from "../context/UserAuthenContext";
import { store } from '../config/Firebase';
import { getDownloadURL,ref } from 'firebase/storage';

export default function Navbar() {
    const { logOut,user } = useUserAuth();
    const [image,setImage] = useState();
    let navigate = useNavigate();
    const location = useLocation();
    const handleLogout = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    }

    const handleImage = async () => {
    
      const storeRef = ref(store, `Users/${user.uid}.jpg`);
      const imageRef = await getDownloadURL(storeRef);

      

     
      setImage(imageRef);
    
  };
  useEffect(() => {
    handleImage();
    
  });
  return (
    <div className="navbar bg-primary">
  <div className="flex-1">
  
 
  <div className="drawer z-50">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary tn-ghost text-xl text-white">ReadMe Store</label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <div className='btn btn-primary tn-ghost text-xl text-white'><Link to="/homepage">ReadMe Store</Link></div>
      
      <li><Link to="/homepage/insert" className="my-2 text-lg">Books</Link></li>
      <li><Link to="/dashboard" className="my-2 text-lg">Dashboard</Link></li>
      <li><Link  className="my-2 text-lg">Chat</Link></li>
      
      
    </ul>
  </div>
</div>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      
    </div>
    <div className='text-white'>{user?.email}</div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="" src={image} />
        </div>
      </div>
      
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
           
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}
