import React from 'react'
import { createContext,useContext,useState,useEffect } from 'react'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,getAuth,signOut,onAuthStateChanged } from 'firebase/auth'
import { Firebase_Auth } from '../config/Firebase';
import Swal from 'sweetalert2';

const userAuthContext = createContext();
export  function UserAuthContextProvider({children}) {

const [user,setUser] = useState({});
function Login(Email,Password){
   if(Email&& Password && Email !== 'testweb@gmail.com'){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No Permission To Login.!",
        footer: ' <Link to='/'>Back</Link>'
      });
      return;
   }
    return signInWithEmailAndPassword(Firebase_Auth,Email,Password);
}

function sigUp(Email,Password){
    return createUserWithEmailAndPassword(Firebase_Auth,Email,Password);
}
function logOut(){
    return signOut(Firebase_Auth);
}

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(Firebase_Auth,(currentUser)=>{
            console.log("Auth",currentUser)
            setUser(currentUser);
            console.log(user.uid)
        })
        return ()=>{
            unsubscribe();
        }
    })


  return (
   <userAuthContext.Provider value={{user,Login,sigUp,logOut}}>{children}</userAuthContext.Provider>
  )
}
export function useUserAuth(){
    return useContext(userAuthContext)
}