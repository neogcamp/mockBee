import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  // const [habits, setHabits] = useState([]);
  const encodedToken = localStorage.getItem("token");

  useEffect(() => {
    (async () => {})();
  }, [token]);

  // signup API call
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
      {token}
      {encodedToken}
      <button onClick={() => signupHandler()}> Signup</button>
      <button onClick={() => loginHandler()}> Login</button>
    </div>
  );
}

export default App;
