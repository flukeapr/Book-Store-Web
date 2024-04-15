import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthenContext'

export default function ProtectedRoute({children}) {
    const {user} = useUserAuth();
    if(!user){
        return <Navigate to="/login"/>
    }
    
  return (
   children
  )
}
