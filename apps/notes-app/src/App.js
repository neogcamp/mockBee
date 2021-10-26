// THIS FILE IS JUST FOR TESTING PURPOSES. Will be deleted once while publishing it.

import React, { useState, useEffect } from "react";
import axios from 'axios'
export default function App() {
  let [token, setToken] = useState("");
  const encodedToken = localStorage.getItem("token");
  const [user, setUser] = useState({})

  // signup API call
  const signupHandler = async () => {
    try {
      const response = await axios.post(
        `/api/auth/signup`, {firstName: "Soham",
        lastName: "Shah",
        email: "sohamshah456@gmail.com",
        password: "123"}
      );
      setUser(response.data.createdUser);
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
      setUser(response.data.foundUser);
      localStorage.setItem("token", response.data.encodedToken);
        setToken(response.data.encodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNote = async () => {
    try {
      const response = await axios.post(
        `/api/notes`, {
        note: {
          title: "Hello World",
          content: "Awesome brooo", tags: ["code", "js"]
        }}, {headers: {
          authorization: encodedToken,
        },}
      );
      setUser({...user, notes:response.data.notes});
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateNote = async (noteId) => {
    try {
      const response = await axios.post(
        `/api/notes/${noteId}`, {
        note: {
          title: "Hiiii",
          content: "Awesome brooo", tags: ["code", "js"]
        }}, {headers: {
          authorization: encodedToken,
        },}
      );
      setUser({...user, notes:response.data.notes});
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteNote = async (noteId) => {
    try {
      const response = await axios.delete(
        `/api/notes/${noteId}`, {headers: {
          authorization: encodedToken,
        },}
      );
      
      setUser({...user, notes:response.data.notes});
    } catch (error) {
      console.log(error);
    }
  };
  const handleArchiveNote = async (noteId) => {
    try {
      const response = await axios.post(
        `/api/notes/archive/${noteId}`, {}, {headers: {
          authorization: encodedToken,
        },}
      );
      
      setUser({...user, notes:response.data.notes, archives:response.data.archives});
    } catch (error) {
      console.log(error);
    }
  };
  return <div>
    <button onClick={() => signupHandler()}> Signup</button>
      <button onClick={() => loginHandler()}> Login</button>
      <button onClick={() => handleCreateNote()}> Create Note</button>
    <h1>Notes</h1>
    <div>
      {user.notes && user.notes.map(note => 
      
      <div>
        {note.title}
        <button onClick={() => handleUpdateNote(note._id)}>Update</button>
        <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
        <button onClick={() => handleArchiveNote(note._id)}>Archive</button>  
      </div>)}
    </div>
    <h1>Archives</h1>
    <div>
      {user.archives && user.archives.map(archive => <div>{archive.title}</div>)}
    </div>
  </div>
}