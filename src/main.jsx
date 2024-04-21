import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { UserAuthContextProvider } from './context/UserAuthenContext.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter 
} from "react-router-dom";
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import HomePage from './components/HomePage.jsx';
import ProtectedRoute from './Auth/ProtectedRoute.jsx';
import Insert from './components/Insert.jsx';
import Dashboard from './components/Dashboard.jsx';
import EditProduct from './components/EditProduct.jsx';
import Alluser from './components/Alluser.jsx';
import Listbook from './components/Listbook.jsx';
import Cart from './components/Cart.jsx';
import OrderDetails from './components/OrderDetails.jsx';
import Chat from './components/Chat.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/homepage",
    element: <ProtectedRoute><HomePage /></ProtectedRoute>,
  },
  {
    path: "/insert",
    element: <ProtectedRoute><Insert /></ProtectedRoute>,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: "/homepage/edit/:id",
    element: <ProtectedRoute><EditProduct /></ProtectedRoute>,
  },
  {
    path: "/dashboard/allusers",
    element: <ProtectedRoute><Alluser /></ProtectedRoute>,
  },
  {
    path: "/dashboard/allbooks",
    element: <ProtectedRoute><Listbook /></ProtectedRoute>,
  },
  {
    path: "/dashboard/orderDetail",
    element: <ProtectedRoute><OrderDetails /></ProtectedRoute>,
  },
  {
    path: "/cart",
    element: <ProtectedRoute><Cart /></ProtectedRoute>,
  },
  {
    path: "/chat",
    element: <ProtectedRoute><Chat /></ProtectedRoute>,
  }



])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      
      <UserAuthContextProvider>
      
      <RouterProvider router={router}/>
     
      </UserAuthContextProvider>
    
      
        
      
    
  </React.StrictMode>,
)
