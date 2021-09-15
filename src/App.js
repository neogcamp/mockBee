import React, { useState, useEffect } from 'react';

export default function App() {
  let [token, setToken] = useState()
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishList,setWishList] = useState([])
  const encodedToken = localStorage.getItem('token')

  useEffect(() => {
      fetch("/api/products")
        .then((resp) => resp.json())
        .then((data) => {
          setProducts(data.products);
        });
  }, []);

  useEffect(() => {
    if(token){
        fetchCartDetails();
        fetchWishListDetails();
    } 
  },[token, encodedToken])



  const fetchCartDetails = () => {
    fetch("/api/user/cart", {headers: {
      authorization: encodedToken
    },})
        .then((resp) => resp.json())
        .then((data) => {
          setCart(data.cart)         
        });
  }

  const fetchWishListDetails = () => {
    fetch("/api/user/wishlist", {headers: {
      authorization: encodedToken
    },})
        .then((resp) => resp.json())
        .then((data) => {
          setWishList(data.wishList)         
        });
  }

  // signup API call
  const signupHandler = () => {
    fetch("api/signup", {method: "POST", body: JSON.stringify({ firstName: "Soham", lastName: "Shah", username: "sohamsshah", password: "123" }),})
      .then(res => res.json())
      .then(data => {
          localStorage.setItem('token', data.encodedToken)
          setToken("ENCODED SECRET MESSAGE")
      })}
  
  // signup API call
  const loginHandler = () => {
    fetch("api/login", {method: "POST", body: JSON.stringify({ username: "sohamsshah", password: "123" }),})
      .then(res => res.json())
      .then(data => {
          localStorage.setItem('token', data.encodedToken)
          setToken("ENCODED SECRET MESSAGE")
      })}

    // Cart Handlers
    const addToCart = (product) => {
      // Call post api
      fetch("api/user/cart", {
        method: "POST",
        headers: {
          authorization: encodedToken
        },
        // Stringify data and send it
        body: JSON.stringify({ product }),
      }).then(data => data.json()).then(data => setCart(data.cart)).catch((err) => {
        console.log("Error", err);
      });

    };

    const addToWishList = (product) => {
      // Call post api
      fetch("api/user/wishlist", {
        method: "POST",
        headers: {
          authorization: encodedToken
        },
        // Stringify data and send it
        body: JSON.stringify({ product }),
      }).then(data => data.json()).then(data => setWishList(data.wishList)).catch((err) => {
        console.log("Error", err);
      });

    };

    const removeFromCart = (product) => {
      fetch("api/user/cart", {
        method: "DELETE",
        headers: {
          authorization: encodedToken
        },
        // Stringify data and send it
        body: JSON.stringify({ product }),
      }).then(data => data.json()).then(data => setCart(data.cart)).catch((err) => {
        console.log("Error", err);
      });

    };
    const removeFromWishList = (product) => {
      fetch("api/user/wishlist", {
        method: "DELETE",
        headers: {
          authorization: encodedToken
        },
        // Stringify data and send it
        body: JSON.stringify({ product }),
      }).then(data => data.json()).then(data => setWishList(data.wishList)).catch((err) => {
        console.log("Error", err);
      });

    };
  
  return (
    
    <div>
      <h2>Available Products</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.title}</td>
                <td>{product.author}</td>
                <td><button onClick={() => addToCart(product)}> 🚀 </button></td>
                <td><button onClick={() => addToWishList(product)}> 📦 </button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => signupHandler()}> Signup</button>
      <button onClick={() => loginHandler()}> Login</button>
      <div>
        <h1>Cart </h1>
        <ul>
          {cart.map(product => <li>{product.title} <button onClick={() => removeFromCart(product)}> Remove</button></li>)}
        </ul>
      </div>
      <div>
        <h1>WishList </h1>
        <ul>
          {wishList.map(product => <li>{product.title} <button onClick={() => removeFromWishList(product)}> Remove</button></li>)}
        </ul>
      </div>
    </div>
  )
}
