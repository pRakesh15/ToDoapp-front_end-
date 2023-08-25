import React, { useContext, useEffect, useState } from "react";
import "./Style/user.css";
import axios from "axios";
import { context } from "../main";
import { server } from "../main";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

export default function Uhome() {
  //using use state hook and context hoook
  const [titel, setTiitel] = useState("");
  const [descripption, setDescripption] = useState("");
  const { isAuthanticarion, setisAuthanticarion, Loding, setLoding } =
    useContext(context);
  const [tasks, setTasks] = useState([]);
  const[referesh,setReferesh]=useState(false)

  //adding task
  const taskHendler = async (e) => {
    try {
      e.preventDefault();
      setLoding(true);
      const { task } = await axios.post(
        `${server}/task/new`,
        {
          titel,
          descripption,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Task added Sucessfully");
      setTiitel("");
      setDescripption("");
      setReferesh(prev=>!prev);
      setisAuthanticarion(true);
      setLoding(false);
    } catch (error) {
      toast.error("some error");
      setisAuthanticarion(false);
      setLoding(false);
    }
  };
//display the task that added by the user
  useEffect(() => {
    axios
      .get(`${server}/task/myTask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
        setReferesh(prev=>!prev);
      })
      .catch((e) => {
        toast.error("somthing wrong");
      });
  },[referesh]);

  //for update the task add by  the user

  const updateHandler=async(id)=>
  {
try {

 const {data} = await axios.put(`${server}/task/${id}`,{},
  {
    withCredentials:true,
  });
  toast.success(data.message);
  setReferesh(prev=>!prev);
} catch (error) {
  toast.error("Somthing went wrong !!")
}
  };

  //delete task

  const deletHendler=async(id)=>
  {
    try {

      const {data} = await axios.delete(`${server}/task/${id}`,
       {
         withCredentials:true,
       });
       toast.success(data.message);
       setReferesh(prev=>!prev);
     } catch (error) {
       toast.error("Somthing went wrong !!")
     }
  }




    if(!isAuthanticarion){
      return <Navigate to={"/LOgin"}/>
    }

  return (
    <>
      <div className="taskfilid">
        <div className="refer">Add your task here</div>
        <input
          type="text"
          value={titel}
          placeholder="title"
          className="titel"
          onChange={(e) => setTiitel(e.target.value)}
          required
        />
        <textarea
          value={descripption}
          className="description"
          onChange={(e) => setDescripption(e.target.value)}
          required
          id="myBox"
          placeholder="DESCRIPTION"
          rows="7"
        ></textarea>

        <div className="task">
          <button onClick={taskHendler}>Add TO Task</button>
        </div>
      </div>
      <div className="userTask">

      { tasks.map(item=>
        <div className="taskList" key={item._id}>
        <div className="taskelement">
        <h1 className="tasktitel">{item.titel}</h1>
        <h4 className="taskdescription">{item.descripption}</h4>
        </div>
        
        <div className="taskbuttion">
        <input type="checkbox" onChange={()=>updateHandler(item._id)} checked={item.isCompleted} />
        <button className="btn" onClick={()=>deletHendler(item._id)} >delete</button>
        </div>
     
        </div>
       
        
        )}
        
      </div>
    </>
  );
}
