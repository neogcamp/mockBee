import React, { useState, useEffect } from "react";

export default function App() {
  let [token, setToken] = useState();
  const [videos, setVideos] = useState([]);
  const encodedToken = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/videos")
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      setVideos(data.videos);
    });
  }, []);

  // signup API call
  const signupHandler = () => {
    fetch("api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName: "Soham",
        lastName: "Shah",
        email: "sohamshah456@gmail.com",
        password: "123",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.encodedToken);
        setToken(data.encodedToken);
      });
  };

  // signup API call
  const loginHandler = () => {
    fetch("api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "dhruvishah@gmail.com", password: "dhruviShah123" }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.encodedToken);
        setToken(data.encodedToken);
      });
  };
  return (
    <div>
      <h2>Available Products</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {videos.map((video, index) => {
            return (
              <tr key={index}>
                <td>{video.title}</td>
                <td>{video.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => signupHandler()}> Signup</button>
      <button onClick={() => loginHandler()}> Login</button>
      <div>
              </div>
    </div>
  );
}
