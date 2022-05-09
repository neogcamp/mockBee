# Auth

Authentication APIs serve functionalities such as Login and Signup. These Routes are common for all the apps which has user and related functionalities. For user to access the private routes and get personalised features, authentication is inevitable.

**mockBee** adapts the JWT Authentication Strategy. Let us look into it in brief.

---

## JWT Authentication

The state is maintained on the client-side in this case. JWT is self-contained. It can carry important user information, which can be decoded on the server using a private secret key. The decoded information is then used for user identification on the server.

In simple words, JWT Authentication Strategy can be understood as:

- For signing up, the user sends data such as firstName, lastName, email and password to the server.
- The Server, creates a `JWT Token` out of the provided data AND a `JWT_SECRET` and gives it to the user. Note that JWT Token has encrypted informated that includes user's data.
- The User stores in their localStorage/cookie.
- Now, when the User tries to access private routes, the token is passed with the HTTP REQUEST as a `requestHeader`.
- The Server, with the `JWT_SECRET` verifies the token and if the token is valid, which means that the user is authenticated. Now, the server can let user access the routes that are requested.
- You can read more about **JWT Authentication** at [jwt.io](https://jwt.io/).

---

## Auth Routes

The Authentication with **mockBee** takes `email` and `password` as credentials to authenticate the User to the application.

### 1. POST `/api/auth/signup`

- **Request URL**: `/api/auth/signup`
- **HTTP Method**: POST
- **Request Body**:
  ```js
  {
    email, password, someUserAttribute1, someUserAttribute2;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      createdUser, encodedToken;
    }
  }
  ```

- **Functionality**: This API call creates and signs up a new user to the database.

---

### 2. POST `/api/auth/login`

- **Request URL**: `/api/auth/login`
- **HTTP Method**: POST
- **Request Body**:
  ```js
  {
    email, password;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      foundUser, encodedToken;
    }
  }
  ```

- **Functionality**: This API logs in a registered user from the database.

---

## Auth Frontend Guide

### Storing the encodedToken

The Login and Sign Up APIs return `encodedToken` as one of the responses. Since, for accessing the private routes, this has to passed as `authorization` header; you have to store it somewhere on the client.

You can store this token in the client's `localStorage`. The implementation can be similar to:

```jsx
const signupHandler = async () => {
  try {
    const response = await axios.post(`/api/auth/signup`, {
      firstName: "Adarsh",
      lastName: "Balika",
      email: "adarshbalika@neog.camp",
      password: "adarshBalika",
    });
    // saving the encodedToken in the localStorage
    localStorage.setItem("token", response.data.encodedToken);
  } catch (error) {
    console.log(error);
  }
};
```

### Accessing Private Routes

To access private routes, you need to pass the encodedToken which is stored in the localStorage as an `authorizationHeader` in the request.

The implementation can be similar to:

```jsx
import React, { useState } from "react";
s;
const encodedToken = localStorage.getItem("token");
const [foo, setFoo] = useState([]);
const fetchFooDetails = async () => {
  try {
    const response = await axios.get(`/api/user/private-route`, {
      headers: {
        authorization: encodedToken, // passing token as an authorization header
      },
    });
    setFoo(response.data.bar);
  } catch (error) {
    console.log(error);
  }
};
```
