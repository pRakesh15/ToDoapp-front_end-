import React, { useContext, useEffect } from 'react'
import './Style/Navbar.css'
import { Link, Navigate } from 'react-router-dom'
import { context ,server} from '../main'
import { toast } from 'react-hot-toast'
import axios from 'axios'
const Navbar = () => {

const {isAuthanticarion, setisAuthanticarion,Loding, setLoding}=useContext(context);

//Creatibng a logout hendler for logout peg
const logoutHandler=async(e)=>
{
  setLoding(true)
try {

await axios.get(`${server}/user/logout`,

{
  
  withCredentials:true,
}
);

toast.success("loged out Sucessfully");
setisAuthanticarion(false)

setLoding(false)
} catch (error) {
  toast.error("some error")
  console.log(error)
  setisAuthanticarion(true)
  setLoding(false)
}

}

  return (
<>
<header>
<nav className="navbar">
<div className="logo">
<li className='img'>
TaskZone
</li>
</div>
<div className="menue">

{
  isAuthanticarion?(<li>
    <Link to="/homeofUser" className='link' >Home</Link>
    </li>):(<li>
    <Link className='link' to="/">Home</Link>
    </li>)
}

<li>
<Link className='link'  to="/pprofile">Profile</Link>
</li>

{
  isAuthanticarion?(<li>
    <Link to="#" onClick={logoutHandler} aria-disabled={Loding} className='link'>LogOut</Link>
    </li>):(<li>
    <Link  className='link' to="/LOgin">Login</Link>
    </li>)
    
}



</div>

</nav>
</header>

</>
  )
}

export default Navbar
