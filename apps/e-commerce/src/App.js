// THIS FILE IS JUST FOR TESTING PURPOSES. Will be deleted once while publishing it.

import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function App () {
  const [token, setToken] = useState('')
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [wishList, setWishList] = useState([])
  const encodedToken = localStorage.getItem('token')

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/products')
        setProducts(response.data.products)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (token) {
      fetchCartDetails()
      fetchWishListDetails()
    }
  }, [token, encodedToken])

  const fetchCartDetails = async () => {
    try {
      const response = await axios.get('/api/user/cart', {
        headers: {
          authorization: encodedToken
        }
      })
      setCart(response.data.cart)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchWishListDetails = async () => {
    try {
      const response = await axios.get('/api/user/wishlist', {
        headers: {
          authorization: encodedToken
        }
      })
      setWishList(response.data.wishList)
    } catch (error) {
      console.log(error)
    }
  }

  // signup API call
  const signupHandler = async () => {
    try {
      const response = await axios.post('/api/auth/signup', {
        firstName: 'Soham',
        lastName: 'Shah',
        email: 'sohamshah456@gmail.com',
        password: '123'
      })
      localStorage.setItem('token', response.data.encodedToken)
      setToken(response.data.encodedToken)
    } catch (error) {
      console.log(error)
    }
  }

  // login API call
  const loginHandler = async () => {
    try {
      const response = await axios.post('/api/auth/login', {
        email: 'sohamshah456@gmail.com',
        password: '123'
      })
      localStorage.setItem('token', response.data.encodedToken)
      setToken(response.data.encodedToken)
    } catch (error) {
      console.log(error)
    }
  }

  // Cart Handlers
  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        '/api/user/cart',
        { product },
        {
          headers: {
            authorization: encodedToken
          }
        }
      )
      setCart(response.data.cart)
    } catch (error) {
      console.log(error)
    }
  }

  const addToWishList = async (product) => {
    try {
      const response = await axios.post(
        '/api/user/wishlist',
        { product },
        {
          headers: {
            authorization: encodedToken
          }
        }
      )
      setWishList(response.data.wishList)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFromCart = async (product) => {
    try {
      const response = await axios.delete(`/api/user/cart/${product._id}`, {
        headers: {
          authorization: encodedToken
        }
      })
      setCart(response.data.cart)
    } catch (error) {
      console.log(error)
    }
  }
  const removeFromWishList = async (product) => {
    try {
      const response = await axios.delete(`/api/user/wishlist/${product._id}`, {
        headers: {
          authorization: encodedToken
        }
      })
      setWishList(response.data.wishList)
    } catch (error) {
      console.log(error)
    }
  }

  const incrementQuantityHandler = async (product) => {
    try {
      const response = await axios.post(
        `api/user/cart/${product._id}`,
        { action: { type: 'increment' } },
        {
          headers: {
            authorization: encodedToken
          }
        }
      )
      setCart(response.data.cart)
    } catch (error) {
      console.log(error)
    }
  }

  const decrementQuantityHandler = async (product) => {
    try {
      const response = await axios.post(
        `api/user/cart/${product._id}`,
        { action: { type: 'decrement' } },
        {
          headers: {
            authorization: encodedToken
          }
        }
      )
      setCart(response.data.cart)
    } catch (error) {
      console.log(error)
    }
  }

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
                <td>
                  <button onClick={() => addToCart(product)}> 🚀 </button>
                </td>
                <td>
                  <button onClick={() => addToWishList(product)}> 📦 </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={() => signupHandler()}> Signup</button>
      <button onClick={() => loginHandler()}> Login</button>
      <div>
        <h1>Cart </h1>
        <ul>
          {cart.map((product) => (
            <div>
              {' '}
              <li>
                {product.title}{' '}
                <button onClick={() => removeFromCart(product)}> Remove</button>
              </li>{' '}
              <li>
                {' '}
                <button onClick={() => decrementQuantityHandler(product)}>
                  -
                </button>
                {product.qty}{' '}
                <button onClick={() => incrementQuantityHandler(product)}>
                  +
                </button>
              </li>{' '}
            </div>
          ))}
        </ul>
      </div>
      <div>
        <h1>WishList </h1>
        <ul>
          {wishList.map((product) => (
            <li>
              {product.title}{' '}
              <button onClick={() => removeFromWishList(product)}>
                {' '}
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
