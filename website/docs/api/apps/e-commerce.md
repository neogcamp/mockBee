# E-Commerce

**E-Commerce** is store consisting of various products that can showcased and sold ONLINE to the customers! It consists of features such as product-listing, cart, wishlist etc. similar to standard E-Commerce Apps (such as Amazon).

---

## Auth Routes

In `E-Commerce App`, the authentication is done with `email` and `password` credential fields.

You can refer documentation related to Authentication [here](/docs/api/general/auth)

---

## Products Routes

The following Routes are relating to Products. These are Publicly accessible routes.

### 1. GET `/api/products`

- **Request URL**: `/api/products`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      products: Array;
    }
  }
  ```

- **Functionality**: This API call gets all products from the db.

### 2. GET `/api/products/:productId`

- **Request URL**: `/api/products/:productId`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      product: Object;
    }
  }
  ```

- **Functionality**: This API call gets product by productId from the db.

---

## Category Routes

The following Routes are relating to Categories. These are Publicly accessible routes.

### 1. GET `/api/categories`

- **Request URL**: `/api/categories`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      categories: Array;
    }
  }
  ```

- **Functionality**: This API call gets all categories from the db.

### 2. GET `/api/category/:categoryId`

- **Request URL**: `/api/category/:categoryId`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      category: Object;
    }
  }
  ```

- **Functionality**: This API call gets category by categoryId from the db.

---

## Cart Routes

The following Routes are relating to User's Cart. These are private routes.

### 1. GET `/api/user/cart`

- **Request URL**: `/api/user/cart`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      cart: Array;
    }
  }
  ```

- **Functionality**: This API call gets all items of the cart from the db.

### 2. POST `/api/user/cart`

- **Request URL**: `/api/user/cart`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    cart;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      cart: Array;
    }
  }
  ```

- **Functionality**: This API call adds a new item to the cart of the user in the db.

### 3. DELETE `/api/user/cart/:productId`

- **Request URL**: `/api/user/cart/:productId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      cart: Array;
    }
  }
  ```

- **Functionality**: This API call removes an item from the cart of the user in the db.

---

### 4. POST `/api/user/cart/:productId`

- **Request URL**: `/api/user/cart/:productId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    action: {
      type: "increment | decrement";
    }
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      cart: Array;
    }
  }
  ```

- **Functionality**: This API call updates an existing cart item quantity for the user in the db.

---

## Wishlist Routes

The following Routes are relating to User's Wishlist. These are private routes.

### 1. GET `/api/user/wishlist`

- **Request URL**: `/api/user/wishlist`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      wishlist: Array;
    }
  }
  ```

- **Functionality**: This API call gets all items of the wishlist from the db.

### 2. POST `/api/user/wishlist`

- **Request URL**: `/api/user/wishlist`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    product;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      wishlist: Array;
    }
  }
  ```

- **Functionality**: This API call adds a product to the wishlist of the user in the db.

### 3. DELETE `/api/user/wishlist/:productId`

- **Request URL**: `/api/user/wishlist/:productId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      wishlist: Array;
    }
  }
  ```

- **Functionality**: This API call removes a product from the wishlist of the user in the db.
