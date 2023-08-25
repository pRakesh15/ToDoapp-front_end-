import React, { useContext, useRef, useState } from "react";
import "./Style/Signinup.css";
import axios from "axios";
import { context, server } from "../main";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

export default function Login() {

    //javaScrippt for animation**
  const myRef = useRef();
  const myRefBtn = useRef();
  const changeClass = () => {
    myRef.current.classList.toggle("right-panel-active");

    myRefBtn.current.classList.remove("btnScaled");
    window.requestAnimationFrame(() => {
      myRefBtn.current.classList.add("btnScaled");
    });
  };

//code for backend api coonnection***

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPasword]=useState("")
const {isAuthanticarion, setisAuthanticarion}=useContext(context);
const [ShowButton, setShowButton] = useState(false);

//createHendler for user registration
const createHendler=async(e)=>
{
try {
  setShowButton(true)
  e.preventDefault();

 const {data}=await axios.post(`${server}/user/createUser`,
 {
  name,
  email,
  password,

 },
 
  {
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true,
  }
 );
 toast.success(data.message);
setisAuthanticarion(true)
setShowButton(false)
} catch (error) {
  toast.error(error.response.data.message)
  setisAuthanticarion(false)
  setShowButton(false)
}
}
//login user or connicting to loginapi
const loginHandler=async(e)=>
{
  

try {
  setShowButton(true)
 
  e.preventDefault();
const  { myData }=await axios.post(`${server}/user/loginUser`,
{
  email,
  password
},
{
  headers:{
      "Content-Type":"application/json"
  },
  withCredentials:true,
}
);

toast.success(`wellCome back !! `);
setisAuthanticarion(true)
setShowButton(false)

} catch (error) {
  toast.error(error.response.data.message)
  setisAuthanticarion(false)
  setShowButton(false)
}
}

if(isAuthanticarion) return <Navigate to={"/homeofUser"}/>
  return (
    <>
      <div className="body">
        <div className="container" id="container" ref={myRef}>
        
          <div className="form-container sign-up-container">
            <form onSubmit={createHendler} >
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <div className="infield">
                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
                <label></label>
              </div>
              <div className="infield">
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <label></label>
              </div>
              <div className="infield">
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPasword(e.target.value)} required/>
                <label></label>
              </div>
              <button type="button" onClick={createHendler} disabled={ShowButton}>Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={loginHandler}>
              <h1>Sign In</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              <div className="infield">
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <label></label>
              </div>
              <div className="infield">
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPasword(e.target.value)} required/>
                <label></label>
              </div>
              <a href="#" className="forgot">
                Forgot your password?
              </a>
              <button disabled={ShowButton}>Sign In</button>
            </form>
          </div>
          <div className="overlay-container" id="overlayCon">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button>Sign Up</button>
              </div>
            </div>
            <button
              onClick={changeClass}
              id="overlayBtn"
              ref={myRefBtn}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
}
