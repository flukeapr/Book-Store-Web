import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/Firebase";

import { getDownloadURL, listAll } from "firebase/storage";
import { store } from "../config/Firebase";
import { ref } from "firebase/storage";
import LodingMainPage from "./LodingMainPage";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
 
  const [loading, setLoading] = useState(true);
  if (!products) {
    return (
      <div className="flex justify-center m-10">
        <button className="btn btn-primary">
          <span className="loading loading-spinner"></span>
          loading
        </button>
      </div>
    );
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
  };

  useEffect(() => {
    getBooks().then(() => setLoading(false));
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
      <Navbar onSearch={setSearch}></Navbar>

      
      {loading ? (
        <LodingMainPage/>
        //animate-pulse
      ) : (
        /////
        
        <div className="grid grid-cols-4 gap-4 mx-10 my-10 max-lg:grid-cols-2">
          {products
            .filter((prod) => {
              if (search == "") {
                return prod;
              } else if (prod.name.includes(search)||prod.category.includes(search)) {
                return prod;
              }
            })
            .map((prod) => {
              return (
                <ProductCard
                  product={prod}
                  name={prod.name}
                  image={prod.image}
                  id={prod.id}
                  price={prod.price}
                  key={prod.id}
                  story={prod.story}
                ></ProductCard>
              );
            })}
        </div>
        
      )}
     
    </>
  );
}
