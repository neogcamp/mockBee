import React, { useState, useEffect } from "react";
import "./app.css";

function App() {
  // State for books
  const [books, setBooks] = useState([]);
  let [token, setToken] = useState()

  useEffect(() => {
    fetch("/api/auth")
      .then(res => res.json())
      .then(data => {
        if (localStorage.length === 0) {
          localStorage.setItem('token', data.encodedToken)
          setToken("ENCODED SECRET MESSAGE")
        }
      })
  })

  function decodeToken() {
    const encodedToken = localStorage.getItem('token')
    fetch("/api/decode", {
      headers: {
        Authorization: encodedToken
      }
    })
  }

  // Call API
  useEffect(() => {
    // Interval: will call itself after specified interval of time
    setInterval(() => {
      // Fetch Data
      fetch("/api/books")
        .then((resp) => resp.json())
        .then((data) => {
          setBooks(data);
        });
    }, 2000);
  }, []);

  // Add Book
  const addBook = () => {
    const title = prompt("Enter Book Title");
    const author = prompt("Enter Book Author");

    // If Data is not there
    if (!title || !author) {
      return false;
    }
    // Call post api
    fetch("api/add", {
      method: "POST",
      // Stringify data and send it
      body: JSON.stringify({ title, author }),
    }).catch((err) => {
      console.log("Error", err);
    });
  };

  // If data is loading
  if (!books.length) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="main-container">
      <button onClick={() => decodeToken()}>Click me to decode!</button>
      <h2>Available Books</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book, index) => {
            return (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}

export default App;
