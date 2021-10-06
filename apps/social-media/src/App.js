// THIS FILE IS JUST FOR TESTING PURPOSES. Will be deleted once while publishing it.

import React,{useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

function App() {
  let [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({})
  // signup API call
  const signupHandler = async () => {
    try {
      const response = await axios.post(
        `/api/auth/signup`, {firstName: "Soham",
        lastName: "Shah",
        username: "sohamshah456",
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

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `/api/posts`
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const fetchPostDetails = async(postId) => {
    try {
      const response = await axios.get(
        `/api/posts/${postId}`
      );
      setPost(response.data.post)
    } catch (error) {
      console.log(error);
    } }

  return (
    <div>
      <button onClick={signupHandler}>Signup</button>   
      <button onClick={loginHandler}>Login</button>
      {posts.map(item  => <div><h2>{item.username}</h2><button onClick={() => fetchPostDetails(item._id)}>See Post</button><p>{item.content}</p></div>)}
      <div>
        {post.username}
        {post.content}
      </div>
    </div>
  );
}

export default App;
