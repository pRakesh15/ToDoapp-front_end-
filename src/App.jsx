import { useContext, useEffect, useState } from 'react'

import './App.css'

import Navbar from './components/Navbar'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import Home from './components/Home'

import Login from './components/Login'
import { Toaster, toast } from 'react-hot-toast'
import { context, server } from './main'
import Profile from './components/Profile'
import Uhome from './components/Uhome'
import axios from 'axios'

function App() {
  const {isAuthanticarion, setisAuthanticarion,Loding, setLoding,user,setUser}=useContext(context);
  
  useEffect(()=>
  {
    axios.get(`${server}/user/myProfile`,{
      withCredentials:true
        }).then(res=>
          {
            setUser(res.data.User);
            setisAuthanticarion(true)
          }).catch((error)=>
          {
            // toast.error(error.response.data.message);
      setUser({});
      setisAuthanticarion(false)
          })
  },[])
 
 
  return (
    <div>
   
           <Router>
           <Navbar/>
           <Routes>
           <Route  exact path="/" element={ <Home/>}/>
           <Route  exact path="/pprofile" element={ <Profile/>}/>
          
           <Route  exact path="/LOgin" element={ <Login/>}/>
           <Route  exact path="/homeofUser" element={ <Uhome/>}/>
           
           
           </Routes>
           
           
           <Toaster/>
           </Router>
           
    
    </div>
  )
}

export default App
