# Habit Tracker

**Habit Tracker** is an application that is used to track and manage user habits. Create new Habits, track them, edit, finish, archive, label and more!

Because...

> _Habits don't restrict freedom, they create it_

---

## Auth Routes

In `Habit Tracker App`, the authentication is done with `email` and `password` credential fields.

You can refer documentation related to Authentication [here](/docs/api/general/auth)

---

## Profile Routes

The following Route is related to profile user . This are Privately accessible route.

### 1. GET `/api/user`

- **Request URL**: `/api/user`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      user: Object;
    }
  }
  ```

- **Functionality**: This API call gets all user's data from the db.

---

## Habit Routes

The following Routes are relating to Habits. These are Privately accessible routes.

### 1. GET `/api/habits`

- **Request URL**: `/api/habits`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      habits: Array;
    }
  }
  ```

- **Functionality**: This API call gets all user's habits from the db.

### 2. GET `/api/habits/:habitId`

- **Request URL**: `/api/habits/:habitId`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      habit: Object;
    }
  }
  ```

- **Functionality**: This API call gets a particular user habit from the db.

### 3. POST `/api/habits`

- **Request URL**: `/api/habits`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:

  ```js
  {
    habit: Object;
  }
  ```

- **Response Body**:

  ```js
  {
    data: {
      habits: Array;
    }
  }
  ```

- **Functionality**: This API call creates a new user habit in the db.

### 4. POST `/api/habits/:habitId`

- **Request URL**: `/api/habits/:habitId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:

  ```js
  {
    habit;
  }
  ```

- **Response Body**:

  ```js
  {
    data: {
      habits: Array;
    }
  }
  ```

- **Functionality**: This API call edits a user habit in the db.

### 5. DELETE `/api/habits/:habitId`

- **Request URL**: `/api/habits/:habitId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`

- **Response Body**:

  ```js
  {
    data: {
      habits: Array;
    }
  }
  ```

- **Functionality**: This API call deletes a user habit in the db.

---

## Label Routes

The following Routes are relating to Labels. These are Privately accessible routes.

### 1. GET `/api/labels`

- **Request URL**: `/api/labels`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      labels: Array;
    }
  }
  ```

- **Functionality**: This API call gets all user's labels from the db.

### 2. POST `/api/labels/:labelName`

- **Request URL**: `/api/labels/:labelName`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      labels: Array;
    }
  }
  ```

- **Functionality**: This API call adds a new label from the db.

### 3. DELETE `/api/labels/:labelName`

- **Request URL**: `/api/labels/:labelName`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      labels: Array;
    }
  }
  ```

- **Functionality**: This API call deletes a label from the db.

## Archives Routes

The following Routes are relating to Archives. These are Privately accessible routes.

### 1. GET `/api/archives`

- **Request URL**: `/api/archives`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      archives: Array;
    }
  }
  ```

- **Functionality**: This API call gets all user's archives of a particular project from the db.

### 2. POST `/api/archives/:habitId`

- **Request URL**: `/api/archives/:habitId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      archives: Array,
      habits: Array
    }
  }
  ```

- **Functionality**: This API call archives a habit from the db.

### 3. POST `/api/archives/restore/:habitId`

- **Request URL**: `/api/archives/restore/:habitId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      archives: Array,
      habits: Array
    }
  }
  ```

- **Functionality**: This API call restores an archived habit from the db.

### 4. DELETE `/api/archives/delete/:habitId`

- **Request URL**: `/api/archives/delete/:habitId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      archives: Array;
    }
  }
  ```

- **Functionality**: This API call deletes an archived habit from the db.
