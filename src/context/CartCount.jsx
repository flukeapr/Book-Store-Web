import { db } from "../config/Firebase";
import { collection, getCountFromServer, doc } from "firebase/firestore";
import { useUserAuth } from "./UserAuthenContext";
import { useEffect, useState } from "react";


export const useCountCart =  (user) => {
    const [countCart, setCountCart] = useState(0);
   
    useEffect(() => {
        const  getCountCart = async () => {
        try {
            
            const cartRef = doc(db, "Users", user.uid);
         await getCountFromServer(collection(cartRef,"Cart")).then((snapshot) => {
            
            setCountCart(snapshot.data().count);
            
          });
          } catch (error) {
            console.log("Error getting documents: ", error);
          }
    }
    getCountCart();
})
    return countCart
}
    

   
    
