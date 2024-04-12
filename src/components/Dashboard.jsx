import React from 'react'
import Navbar from './Navbar'

export default function Dashboard() {
  return (
   <>
   <Navbar/>
   <div>
   <div className='container flex justify-center  w-full h-44'>
    <div className='card bg-white shadow-xl w-1/5'></div>
    <div className='card bg-white shadow-xl w-1/5'></div>
    <div className='card bg-white shadow-xl w-3/5'></div>
   </div>
   </div>
   
   </>
  )
}
