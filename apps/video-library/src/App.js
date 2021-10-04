// THIS FILE IS JUST FOR TESTING PURPOSES. Will be deleted once while publishing it.

import React, { useState, useEffect } from "react";
import axios from 'axios'

export default function App() {
  let [token, setToken] = useState("");
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([])
  const [history, setHistory] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const encodedToken = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `/api/videos`
        );
        setVideos(response.data.videos);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (token) {
      fetchLikedVideoDetails();
      fetchHistory();
      fetchPlaylists();
    }
  }, [token, encodedToken]);

  // Auth Handlers
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

  // Like Handlers
  const fetchLikedVideoDetails = async () => {
    try {
      const response = await axios.get(
        `/api/user/likes`,
        {
          headers: {
            authorization: encodedToken,
          }
        }
      );
      setLikedVideos(response.data.likes)
    } catch (error) {
      console.log(error);
    }
  };

  const addToLikedVideos = async (video) => {
    try {
      const response = await axios.post(
        `/api/user/likes`, { video }, {headers: {
          authorization: encodedToken,
        }}
      );
      setLikedVideos(response.data.likes)
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromLikedVideos = async (video) => {
    try {
      const response = await axios.delete(
        `/api/user/likes/${video._id}`, {
          headers: {
          authorization: encodedToken,
        }}, 
      );
      setLikedVideos(response.data.likes)
    } catch (error) {
      console.log(error);
    }
  };

  // History Handlers
  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `/api/user/history`,
        {
          headers: {
            authorization: encodedToken,
          }
        }
      );
      setHistory(response.data.history);
    } catch (error) {
      console.log(error);
    }
  };

  const addToHistory = async (video) => {
    try {
      const response = await axios.post(
        `/api/user/history`, { video },
        {
          headers: {
            authorization: encodedToken,
          }
        }
      );
      setHistory(response.data.history);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromHistory = async (video) => {
    try {
      const response = await axios.delete(
        `api/user/history/${video._id}`, 
        {
          headers: {
            authorization: encodedToken,
          }
        }
      );
      setHistory(response.data.history);
    } catch (error) {
      console.log(error);
    }
  };

  const clearHistory = async (video) => {
    try {
      const response = await axios.delete(
        `api/user/history/all`,
        {
          headers: {
            authorization: encodedToken,
          }
        }
      );
      setHistory(response.data.history);
    } catch (error) {
      console.log(error);
    }
  };

  // Playlist Handlers
  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(
        `/api/user/playlists`,
        {
          headers: {
            authorization: encodedToken,
          }
        }
      );
      setPlaylists(response.data.playlists)
    } catch (error) {
      console.log(error);
    }
  };

  const createPlaylist = async (playlist) => {
    try {
      const response = await axios.post(
        `/api/user/playlists`, { playlist },
        {
          headers: {
            authorization: encodedToken,
          }
        }
      );
      setPlaylists(response.data.playlists);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlaylist = async (playlist) => {
    try {
      const response = await axios.delete(
        `/api/user/playlists/${playlist._id}`, 
        {
          headers: {
            authorization: encodedToken,
          }
        }
      );
      setPlaylists(response.data.playlists);
    } catch (error) {
      console.log(error);
    }
  };

  const addToPlaylist = async (video) => {
    const _id = playlists[0]._id;
    try {
      const response = await axios.post(
        `/api/user/playlists/${_id}`, { video },
        {
          headers: {
            authorization: encodedToken,
          }
        }
      );
      let index;
      playlists.forEach((item, index) => {
        if(item._id === response.data.playlist._id ){
          return index;
        }
       } );
       playlists.splice(index, 1, response.data.playlist)
       console.log(playlists)
       setPlaylists([...playlists])
    } catch (error) {
      console.log(error);
    }
  };
  const removeVideoFromPlaylist = async (video) => {
    const _id = playlists[0]._id;
    try {
      const response = await axios.delete(
        `/api/user/playlists/${_id}/${video._id}`,
        {
          headers: {
            authorization: encodedToken,
          }
        }
      );
      let index;
      playlists.forEach((item, index) => {
        if(item._id === response.data.playlist._id ){
          return index;
        }
       } );
       playlists.splice(index, 1, response.data.playlist)
       setPlaylists([...playlists])
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <h2>Available Videos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Like</th>
          </tr>
        </thead>

        <tbody>
          {videos.map((video, index) => {
            return (
              <tr key={index}>
                <td>{video.title}</td>
                <td>{video.description}</td>
                <td><td>
                  <button onClick={() => addToLikedVideos(video)}> 🚀 </button>
                  <button onClick={() => removeFromLikedVideos(video)}> 🕯 </button>
                  <button onClick={() => addToHistory(video)}> 🤩 </button>
                  <button onClick={() => addToPlaylist(video)}> 🤘 </button>
                </td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => signupHandler()}> Signup</button>
      <button onClick={() => loginHandler()}> Login</button>
      <div>
        <h1>Liked Videos</h1>
        <ul>
          {likedVideos.map((video) => (
            <div>
              {" "}
              <li>
                {video.title}{" "}

              </li>{" "}
            </div>
          ))}
        </ul>
      </div>

      <div>
        <h1>History Videos <button onClick={() => clearHistory()}>Clear</button></h1>
        <ul>
          {history.map((video) => (
            <div>
              {" "}
              <li>
                {video.title}{" "}
                <button onClick={() => removeFromHistory(video)}>Remove</button>
              </li>{" "}
            </div>
          ))}
        </ul>
      </div>
      <div>
        <h1>Playlists </h1>
        <div>
        <button onClick={() => createPlaylist({title:"Watch Later"})}>Create Playlist</button>
        </div>
        <ul>
          {playlists.map((playlist) => (
            <div>
              {" "}
              <li>
                {playlist.title}{" "}
                {playlist.videos.map(video => <div>{video.title}<button onClick={() => removeVideoFromPlaylist(video)}>Remove From Videos</button></div>)}
                <button onClick={() => deletePlaylist(playlist)}>Delete Playlist</button>
              </li>{" "}
            </div>
          ))}
        </ul>
      </div>

    </div>
    
  );
}
