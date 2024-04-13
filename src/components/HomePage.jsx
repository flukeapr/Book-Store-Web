import {useState, useEffect} from 'react'
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import axios from 'axios'
import Insert from './Insert';
import { Link } from 'react-router-dom';
import {getDocs ,collection} from 'firebase/firestore';
import { db } from "../config/Firebase";
import Swal from 'sweetalert2';
import { getDownloadURL, listAll } from 'firebase/storage';
import { store } from "../config/Firebase";
import { ref } from 'firebase/storage';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [images , setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    if(!images){
      return <div className='flex justify-center m-10'>
      <button className="btn btn-primary">
    <span className="loading loading-spinner"></span>
    loading
  </button>
      </div>
    }
    const getBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Book"));
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
       
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    }
    
    useEffect(() => {
      getBooks()
    }, [])
    useEffect(() => {
      listAll(ref(store, "Book")).then((res) => {
        const promises = res.items.map((item) => getDownloadURL(item));
        Promise.all(promises).then((urls) => {
          setImages(urls);
          setLoading(false); // เมื่อโหลดเสร็จให้เปลี่ยนสถานะ loading เป็น false
        });
      });
    }, []);

    // useEffect(()=>{
    //   listAll(ref(store, "Book")).then((res)=>{
    //     res.items.forEach((item)=>{
    //       getDownloadURL(item).then((url)=>{
    //         setImages((prev)=>[...prev,url]).then(()=>{
    //           setLoading(false);
    //         })
    //       })
          
    //     })
    //   })
    // })
  return (
    <>
        <Navbar></Navbar>
       
        <div className='flex justify-end'>
        
        <input className='input input-bordered input-secondary w-full max-w-xs my-8 mx-8' onChange={(e)=>{setSearch(e.target.value)}} placeholder='Search'></input>

        </div>
        {loading ? (
 <div className='flex justify-center m-10'>
 <button className="btn btn-primary">
<span className="loading loading-spinner"></span>
loading
</button>
 </div>
) : (
        <div className='grid grid-cols-4 gap-4 mx-10 my-10 '>
        {products.filter((prod)=>{
     if(search==""){
       return prod
     }else if(prod.name.includes(search)){
       return prod
     }}).map((prod)=>{return(<ProductCard name={prod.name} image={images.find(image => image.includes(prod.id))} id={prod.id} price={prod.price} key={prod.id} story={prod.story}></ProductCard>)})}
     
     
    
        </div>
)}
    </>
    
  )
}
