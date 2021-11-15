# Social Media

A **Social Media** is a web app that connects users and enables to share their content to the web similar to what Twitter and Instagram does. This API has features such as create post, react to posts, view and update user details, follow other users , bookmark your favourite posts, etc.

---

## Auth Routes

In `Social Media App`, the authentication is done with `username` and `password` credential fields. 

You can refer documentation related to Authentication [here](/docs/api/general/auth)

---

## User Routes

The following Routes are Public Routes related to User.

### 1. GET `/api/users`

- **Request URL**: `/api/users`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      users: Array;
    }
  }
  ```

- **Functionality**: This API call gets all users in the db.

### 2. GET `/api/users/:userId`

- **Request URL**: `/api/users/:userId`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      user: Object;
    }
  }
  ```

- **Functionality**: This API call gets a user from the db.

The following Routes are Private Routes related to User.

### 3. POST `/api/users/edit`

- **Request URL**: `/api/users/edit`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:

  ```js
  {
    userData;
  }
  ```

- **Response Body**:

  ```js
  {
    data: {
      user: Object;
    }
  }
  ```

- **Functionality**: This API call is responsible for editing details of the user.

---

## Post Routes

The following Routes are relating to Posts. These are Publicly accessible routes.

### 1. GET `/api/posts`

- **Request URL**: `/api/posts`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      posts: Array;
    }
  }
  ```

- **Functionality**: This API call gets all posts from the db.

### 2. GET `/api/posts/:postId`

- **Request URL**: `/api/post/:postId`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      post: Object;
    }
  }
  ```

- **Functionality**: This API call gets post by postId from the db.

### 3. GET `/api/posts/:username`

- **Request URL**: `/api/post/:username`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      posts: Object;
    }
  }
  ```

- **Functionality**: This API call gets posts by username from the db.

The following Routes are Private Routes related to Posts.

### 4. POST `/api/posts`

- **Request URL**: `/api/posts`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    post;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      posts: Array;
    }
  }
  ```

- **Functionality**: This API call creates a new post to the user's db.

### 5. DELETE `/api/posts/:postId`

- **Request URL**: `/api/posts/:postId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      posts: Array;
    }
  }
  ```

- **Functionality**: This API call deletes a post from the user's db.

### 6. POST `/api/posts/edit/:postId`

- **Request URL**: `/api/posts/edit/:postId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    postData;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      posts: Array;
    }
  }
  ```

- **Functionality**: This API call edits a post of the user.

## Like/Dislike Post Routes

The following Routes are Private Routes related to Liking and Disliking Posts.

### 1. POST `/api/posts/like/:postId`

- **Request URL**: `/api/posts/like/:postId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      posts: Array;
    }
  }
  ```

- **Functionality**: This API call likes a post of the user.

### 2. POST `/api/posts/dislike/:postId`

- **Request URL**: `/api/posts/dislike/:postId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      posts: Array;
    }
  }
  ```

- **Functionality**: This API call dislikes/unlikes a liked post of the user.

## Bookmark Routes

The following Routes are Private Routes related to Bookmarking Posts of User.

### 1. POST `/api/users/bookmark/:postId`

- **Request URL**: `/api/users/bookmark/:postId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      bookmarks: Array;
    }
  }
  ```

- **Functionality**: This API call adds a post to user bookmarks.

### 2. POST `/api/users/remove-bookmark/:postId`

- **Request URL**: `/api/users/remove-bookmark/:postId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      bookmarks: Array;
    }
  }
  ```

- **Functionality**: This API call removes a post from user bookmarks.

## Follow/Unfollow Routes

The following Routes are Private Routes related to Follow/Unfollow action of User.

### 1. POST `/api/users/follow/:followUserId`

- **Request URL**: `/api/users/follow/:followUserId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      user: Object,
      followUser: Object
    }
  }
  ```

- **Functionality**: This API call is responsible for follow action by the user.

### 2. POST `/api/users/unfollow/:followUserId`

- **Request URL**: `/api/users/unfollow/:followUserId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      user: Object,
      followUser: Object
    }
  }
  ```

- **Functionality**: This API call is responsible for unfollow action by the user.

