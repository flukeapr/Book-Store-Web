/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthenContext";
import Swal from "sweetalert2";


export default function Navbar({ onSearch }) {
  const { logOut, user } = useUserAuth();
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut().then(()=>{
        Swal.fire({
          icon: "success",
          title: "Logout successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(()=>{
          navigate("/")
        })
      })
      
    } catch (error) {
      console.log(error.message);
    }
  };

  
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <div className="drawer z-50">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn btn-primary tn-ghost text-xl text-white"
            >
              ReadMe Store
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <div className="btn btn-primary tn-ghost text-xl text-white">
                <Link to="/homepage">ReadMe Store</Link>
              </div>

              <li>
                <Link to="/insert" className="my-2 text-lg">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="my-2 text-lg">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/chat" className="my-2 text-lg">
                  Chat
                </Link>
              </li>
              <li className='mt-[620px]' onClick={handleLogout}>
            {/* Page content here */}
            <label
              
              className="btn btn-primary tn-ghost text-xl text-white"
            ><ion-icon name="log-out-outline"></ion-icon>
              SignOut
            </label>
          </li>
            </ul>
           
          </div>
          
        </div>
        
      </div>
      <input
        className="input input-bordered border-[#8C0327] w-full max-w-xs mx-2"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      ></input>
      <div className="flex-none gap-2">
        {/* <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {countCart}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{quantity} Items</span>
                <span className="text-info">Subtotal: {total}</span>
                <div className="card-actions">
                  <Link to="/cart" className="btn btn-primary btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="text-white">{user?.email}</div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user ? (
                <img alt="" src={user?.photoURL} />
              ):(
                <img alt="" src='ProfileThumbnail.png' />
              )}
              
            </div>
          </div>

          {/* <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
}
