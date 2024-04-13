import React, { useEffect,useState } from 'react'
import Navbar from './Navbar';
import { db } from '../config/Firebase';
import { getCountFromServer,collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  const [countUsers, setCountusers] = useState(0);
  const [countBooks, setCountbooks] = useState(0);
  const [countOrders, setCountorders] = useState(0);
  async function fetchCountUsers() {
    const coll = collection(db, "Users");
    const snapshot = await  getCountFromServer(coll);
    
    setCountusers(snapshot.data().count);
  }
  async function fetchCountBooks() {
    const coll = collection(db, "Book");
    const snapshot = await  getCountFromServer(coll);
    
    setCountbooks(snapshot.data().count);
  }
  useEffect(() => {
    fetchCountUsers();
    fetchCountBooks();
  }, []);
  
  
  
  return (
   <>
   <Navbar/>
   <div className='flex justify-center'>
   <div className=' flex   w-full h-44 m-4'>
    <div className='card bg-white shadow-xl w-1/5 mx-2'>
      <div className='flex flex-col h-fit   my-2 mx-2'> 
      <div className='btn btn-outline btn-primary w-1/3 text-sm rounded-full'>ผู้ใช้งาน</div>
      <div className='text-5xl font-bold flex justify-center'>{countUsers}</div>

      <Link className='text-red-900 text-lg flex  justify-end  my-8 mr-4' to='/dashboard/allusers'>view</Link>
      </div>
    </div>

    <div className='card bg-white shadow-xl w-1/5 mx-2'>
    <div className='flex flex-col h-fit   my-2 mx-2'> 
      <div className='btn btn-outline btn-primary w-1/4 text-sm rounded-full'>หนังสือ</div>
      <div className='text-5xl font-bold flex justify-center'>{countBooks}</div>

      <div className='text-red-900 text-lg flex  justify-end  my-8 mr-4'>view</div>
      </div>
    </div>
    <div className='card bg-white shadow-xl w-3/5 mx-2'>
    <div className='flex flex-col h-fit   my-2 mx-2'> 
      <div className='btn btn-outline btn-primary w-24 text-sm rounded-full'>คำสั่งซื้อ</div>
      <div className='text-5xl font-bold flex justify-center'>{countOrders}</div>

      <div className='text-red-900 text-lg flex  justify-end  my-8 mr-4'>view</div>
      </div>
    </div>
   </div>
   </div>
   

   <div className='flex justify-center  w-full  '>
    <div className='card bg-white shadow-xl w-3/5 h-[600px]  mx-2'>
    <div className='flex flex-col h-fit   my-2 mx-2'> 
      <div className='btn btn-outline btn-primary w-1/4 text-sm rounded-full'>จำนวนหนังสือที่ถูกซื้อ</div>
     
      </div>
      </div>
      <div className='flex flex-col'>
      <div className='card bg-white shadow-xl w-[670px] h-1/2  mx-2'>
    <div className='flex flex-col h-fit   my-2 mx-2'> 
      <div className='btn btn-outline btn-primary w-1/4 text-sm rounded-full'>ประเภทหนังสือ</div>
     
      </div>
      </div>
      <div className='card bg-white shadow-xl w-[670px] h-1/2 my-2 mx-2'>
    <div className='flex flex-col h-fit   my-2 mx-2'> 
      <div className='btn btn-outline btn-primary w-1/4 text-sm rounded-full'>คำสั่งซื้อล่าสุด</div>
     
      </div>
      </div>
      </div>
      </div>
  
   </>
  )
}
