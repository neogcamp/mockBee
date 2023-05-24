# Video Library

A **Video Library** is a web app that consists of collection of Videos. Similar to Youtube, it can have features such as like videos, create playlists, add videos to playlists, history, feed, etc. but of a **specific niche**.

---

## Auth Routes

In `Video Library App`, the authentication is done with `email` and `password` credential fields.

You can refer documentation related to Authentication [here](/docs/api/general/auth)

---

## Video Routes

The following Routes are relating to Videos. These are Publicly accessible routes.

### 1. GET `/api/videos`

- **Request URL**: `/api/videos`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      videos: Array;
    }
  }
  ```

- **Functionality**: This API call gets all videos from the db.

### 2. GET `/api/video/:videoId`

- **Request URL**: `/api/video/:videoId`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      video: Object;
    }
  }
  ```

- **Functionality**: This API call gets video by videoId from the db.

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

### 2. GET `/api/categories/:categoryId`

- **Request URL**: `/api/categories/:categoryId`
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

## Auth Routes

You can refer documentation related to Authentication [here](/docs/api/general/auth)

---

## Likes Routes

The following Routes are relating to User's liked Videos. These are private routes.

### 1. GET `/api/user/likes`

- **Request URL**: `/api/user/likes`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      likes: Array;
    }
  }
  ```

- **Functionality**: This API call gets all liked videos of the user from the db.

### 2. POST `/api/user/likes`

- **Request URL**: `/api/user/likes`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    video;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      likes: Array;
    }
  }
  ```

- **Functionality**: This API call adds a video to the liked videos of the user in the db.

### 3. DELETE `/api/user/likes/:videoId`

- **Request URL**: `/api/user/likes/:videoId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      likes: Array;
    }
  }
  ```

- **Functionality**: This API call removes a video from the liked videos of the user in the db.

---

## Watch Later Routes

The following Routes are relating to User's Watch Later Videos. These are private routes.

### 1. GET `/api/user/watchlater`

- **Request URL**: `/api/user/watchlater`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      watchlater: Array;
    }
  }
  ```

- **Functionality**: This API call gets all watch later videos of the user from the db.

### 2. POST `/api/user/watchlater`

- **Request URL**: `/api/user/watchlater`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    video;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      watchlater: Array;
    }
  }
  ```

- **Functionality**: This API call adds a video to the watch later videos of the user in the db.

### 3. DELETE `/api/user/watchlater/:videoId`

- **Request URL**: `/api/user/watchlater/:videoId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      watchlater: Array;
    }
  }
  ```

- **Functionality**: This API call removes a video from the watch later videos of the user in the db.

---

## Playlist Routes

The following Routes are relating to User's Playlists and Playlisted Videos. These are private routes.

### 1. GET `/api/user/playlists`

- **Request URL**: `/api/user/playlists`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      playlists: Array;
    }
  }
  ```

- **Functionality**: This API call gets all the playlists of the user from the db.

### 2. POST `/api/user/playlists`

- **Request URL**: `/api/user/playlists`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:

  ```js
  {
     playlist: {title: "foo", description:"bar bar bar" }
  }
  ```

- **Response Body**:

  ```js
  {
    data: {
      playlists: Array;
    }
  }
  ```

- **Functionality**: This API call creates a new playlist to the playlists of the user in the db.

### 3. DELETE `/api/user/playlists/:playlistId`

- **Request URL**: `/api/user/playlists/:playlistId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      playlists: Array;
    }
  }
  ```

- **Functionality**: This API call deletes a playlist from the playlists of the user in the db.

### 4. GET `/api/user/playlists/:playlistId`

- **Request URL**: `/api/user/playlists/:playlistId`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      playlist: Object;
    }
  }
  ```

- **Functionality**: This API call gets playlist of the user from the db.

### 5. POST `/api/user/playlists/:playlistId`

- **Request URL**: `/api/user/playlists`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:

  ```js
  {
    video;
  }
  ```

- **Response Body**:

  ```js
  {
    data: {
      playlist: Array;
    }
  }
  ```

- **Functionality**: This API call adds a new video to the playlist of the user in the db.

### 6. DELETE `/api/user/playlists/:playlistId/:videoId`

- **Request URL**: `/api/user/playlists/:playlistId/:videoId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      playlist: Array;
    }
  }
  ```

- **Functionality**: This API call deletes a video from the playlist of the user in the db.

---

## History Routes

The following Routes are relating to User's History. These are private routes.

### 1. GET `/api/user/history`

- **Request URL**: `/api/user/history`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      history: Array;
    }
  }
  ```

- **Functionality**: This API call gets history of the user from the db.

### 2. POST `/api/user/history`

- **Request URL**: `/api/user/history`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    video;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      history: Array;
    }
  }
  ```

- **Functionality**: This API call adds a video to the history of the user in the db.

### 3. DELETE `/api/user/history/:videoId`

- **Request URL**: `/api/user/history/:videoId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      history: Array;
    }
  }
  ```

- **Functionality**: This API call removes a video from the history of the user in the db.

### 4. DELETE `/api/user/history/all`

- **Request URL**: `/api/user/history/all`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      history: Array;
    }
  }
  ```

- **Functionality**: This API call clears the history of the user in the db.

---
