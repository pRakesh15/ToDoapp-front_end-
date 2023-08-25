import React, { useContext } from "react";
import { context } from "../main";
import "./Style/Home.css";
import Navbar from "./Navbar";
import { Link, Navigate } from "react-router-dom";

export default function Home() {
  const { isAuthanticarion } =useContext(context);

  if(isAuthanticarion) return <Navigate to={"/homeofUser"}/>

  return (
    <>
      <section className="content">
        <h1>
          <div className="first">PUT YOURSELF</div> on top of your to-do list
        </h1>
        <p>
          Introducing TaskZone, your ultimate task management companion. This
          intuitive and efficient todo app is designed to help you seamlessly
          organize your life, streamline your tasks, and boost your
          productivity.
        </p>
      </section>
      <section className="login">
        <button className="git">
          <Link className="buttion" to="/LOgin">
            Start For free
          </Link>
        </button>
      </section>
    </>
  );
}
