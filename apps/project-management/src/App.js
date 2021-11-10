import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  // const [projects, setProjects] = useState([]);
  const encodedToken = localStorage.getItem("token");

  const signupHandler = async () => {
    try {
      const response = await axios.post("/api/auth/signup", {
        firstName: "Soham",
        lastName: "Shah",
        email: "sohamshah456@gmail.com",
        password: "123",
      });
      localStorage.setItem("token", response.data.encodedToken);
      setToken(response.data.encodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  // login API call
  const loginHandler = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: "sohamshah456@gmail.com",
        password: "123",
      });
      localStorage.setItem("token", response.data.encodedToken);
      setToken(response.data.encodedToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <h2>Project Management</h2>
      <p>
        {token} {encodedToken}
      </p>
      <button onClick={() => signupHandler()}> Signup</button>
      <button onClick={() => loginHandler()}> Login</button>
    </div>
  );
}

export default App;
