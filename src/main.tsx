import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Pages/Auth/AuthLayout.tsx'
import Login from './Pages/Auth/Login.tsx'
import Register from './Pages/Auth/Register.tsx'
import DashLayout from './Pages/Dashboard/DashLayout.tsx'
import Products from './Pages/Dashboard/Products.tsx'
import Favorites from './Pages/Dashboard/Favorites.tsx'
import Orders from './Pages/Dashboard/Orders.tsx'
import CreateProducts from './Pages/Dashboard/CreateProducts.tsx'
import EditProducts from './Pages/Dashboard/EditProducts.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { SearchProvider } from './contexts/SearchContext.tsx';

const router=createBrowserRouter([
  {
    path:"/",
    element:<AuthLayout/>,
    children:[
      {
        index:true,
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      }
    ]
  },
  {
    path:'/dashboard',
    element:<DashLayout/>,
    children:[
      {
        index:true,
        element:<Products/>
      },
      {
        path:'favorites',
        element:<Favorites/>
      },
      {
        path:'orders',
        element:<Orders/>
      },
      {
        path:'create',
        element:<CreateProducts/>
      },
      {
        path:'edit/:id',
        element:<EditProducts/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <SearchProvider>
      <StrictMode>
        <RouterProvider router={router}/>
        <ToastContainer/>
      </StrictMode>
    </SearchProvider>
  </ThemeProvider>
)
