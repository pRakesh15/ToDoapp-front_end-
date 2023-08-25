import React, { useContext, useEffect, useState } from 'react'

import './Style/Profile.css'

import { toast } from "react-hot-toast";
import { context,server } from '../main'
import { Navigate } from "react-router-dom";
export default function Profile() {
  const {isAuthanticarion,user}=useContext(context)

//re render whent the app is authanticated.
  useEffect(()=>{
    if(!isAuthanticarion)
    {
      toast.error("Login first!!")
   
    } 
  },[isAuthanticarion])

//redirect to login peg when user loged out
    if(!isAuthanticarion){
      return <Navigate to={"/LOgin"}/>
    }
   

  return (
    <>
   <div className="content">
   <div className="profilepic">
   <img src="/user-regular.svg" alt="" />
   </div>
   <h1 className='userName'>{user?.name}</h1>
   <h3 className='userEmail'>{user?.email}</h3>
 
   </div>
    
    </>
  )
}

