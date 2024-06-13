import {useState,useEffect} from 'react'
import Navbar from './Navbar';
import { db} from '../config/Firebase';
import { getDocs ,collection  } from 'firebase/firestore';



export default function Listbook() {
    const [products, setProducts] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
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
        getBooks().then(()=>setLoading(false))
      }, [])
     
  return (
    <>
     <Navbar onSearch={setSearch}/>
     {loading ? (
 <div className='flex justify-center m-10'>
 <button className="btn btn-primary">
<span className="loading loading-spinner"></span>
loading
</button>
 </div>
) : (<div className="overflow-x-auto bg-white p-10 m-0">
<table className="table">
  {/* head */}
  <thead>
    <tr>
    <th>BookName</th>
     
      <th>Story</th>
      <th>Category</th>
      <th>Publisher</th>
      <th>Price</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {/* row 1 */}
    {products.filter((prod) => prod.name.includes(search)).map((prod) => (
        <tr key={prod.id}>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-circle w-24 h-24">
                <img src={prod.image} alt="" />
              </div>
            </div>
            <div>
              <div className="font-bold">{prod.name}</div>
              
            </div>
          </div>
        </td>
        <td className='text-ellipsis overflow-hidden w-2/4'>
          {prod.story}
        </td>
        <td>{prod.category}</td>
        <td>{prod.publisher}</td>
        <td>{prod.price}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    ))}
    
   
  </tbody>
  {/* foot */}
  <tfoot>
    <tr>
    <th>BookName</th>
      <th>Story</th>
      <th>Category</th>
      <th>Publisher</th>
      <th>Price</th>
      <th></th>
    </tr>
  </tfoot>
  
</table>
</div>)}
    </>
   
  )
}
