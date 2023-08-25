import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createContext } from "react";

//this is the restAPI key..
export const server = "https://taskzone-keqp.onrender.com/api/v1";
export const context = createContext({ isAuthanticarion: false,Loding:false});

const Appworper = () => {
  const [isAuthanticarion, setisAuthanticarion] = useState(false);
  const [Loding, setLoding] = useState(false);
  const [user, setUser] = useState({});
  return (
    <context.Provider value={{ isAuthanticarion, setisAuthanticarion,Loding, setLoding,user, setUser }}>
      <App />
    </context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Appworper />
  </React.StrictMode>
);
