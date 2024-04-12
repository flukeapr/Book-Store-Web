import  { useState } from 'react'
import { Link } from 'react-router-dom';


export default function Home() {
    const [alert ,setAlert] = useState(false);
    const btnMore =()=>{
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 3000);
    }
  return (
    <>
    {alert && <div className='flex justify-end my-2'>
    <div role="alert" className="alert alert-info  w-1/2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>Not have Data to Now.</span>
</div>
    </div>}
    
    
    <div className='flex justify-center items-center h-[calc(100vh-200px)]'>
    <img src='Logo.png' className='mx-24'></img>
        <div className=' '>
        <h1 className='text-4xl p-2 italic'>Welcome to <span className='text-primary'>ReadME</span> Store</h1>
        <p className='w-1/2 p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit vel odit totam! Voluptatum quia magnam iste exercitationem ratione, delectus facilis dolores maiores nemo est error numquam quidem ex aut.</p>
        <Link to='/login' className='btn btn-primary my-2 mx-2 w-1/4'>LOGIN</Link>
        <div className='btn btn-outline btn-secondary my-2 mx-2 w-1/4' onClick={btnMore}>Read More</div>
      
        </div>
        
    </div>
    <img src='layer.png'></img>
    
    </>
    
  )
}
