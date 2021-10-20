// THIS FILE IS JUST FOR TESTING PURPOSES. Will be deleted once while publishing it.

import React, { useState, useEffect } from "react";
import axios from 'axios'
export default function App() {
  let [token, setToken] = useState("");
  let [users, setUsers] = useState([]);
  const encodedToken = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      await handleFetchUsers();
      await fetchUserDetails("92fefa34-e003-4d64-a99f-22e25479cbde");
    })();
  }, []);

  const handleEditUser = async (userData) => {
    try {
      const response = await axios.post(
        `/api/users/edit`,
        {userData},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const handleFetchUsers = async () => {
    try {
      const response = await axios.get(`/api/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };
  
  // signup API call
  const signupHandler = async () => {
    try {
      const response = await axios.post(
        `/api/auth/signup`, {firstName: "Soham",
        lastName: "Shah",
        email: "sohamshah456@gmail.com",
        password: "123"}
      );
      localStorage.setItem("token", response.data.encodedToken);
        setToken(response.data.encodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  // login API call
  const loginHandler = async () => {
    try {
      const response = await axios.post(
        `/api/auth/login`, {
        email: "sohamshah456@gmail.com",
        password: "123"}
      );
      localStorage.setItem("token", response.data.encodedToken);
        setToken(response.data.encodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Available Products</h2>
      <button onClick={() => signupHandler()}> Signup</button>
      <button onClick={() => loginHandler()}> Login</button>
      <button onClick={() => handleEditUser({ firstName: "sodium", lastName:"lol" })}>Edit details</button>
    </div>
  );
}
