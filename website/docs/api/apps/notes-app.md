# Notes App

**Notes App** is a note-taking application to create notes similar to Google Keep. You can add your tags, edit, archive and delete your notes!

---

## Auth Routes

In `Notes App`, the authentication is done with `email` and `password` credential fields.

You can refer documentation related to Authentication [here](/docs/api/general/auth)

---

## Notes Routes

The following Routes are relating to Notes. These are Privately accessible routes.

### 1. GET `/api/notes`

- **Request URL**: `/api/notes`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      notes: Array;
    }
  }
  ```

- **Functionality**: This API call gets all notes of the user from the db.

### 2. POST `/api/notes`

- **Request URL**: `/api/notes`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    note;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      notes: Array;
    }
  }
  ```

- **Functionality**: This API call creates a new note for the user in the db.

### 3. POST `/api/notes/:notesId`

- **Request URL**: `/api/notes/:notesId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    note;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      notes: Array;
    }
  }
  ```

- **Functionality**: This API call updates a note for the user in the db.

### 4. DELETE `/api/notes/:notesId`

- **Request URL**: `/api/notes/:notesId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      notes: Array;
    }
  }
  ```

- **Functionality**: This API deletes a note for the user in the db.

---

## Archive Routes

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

- **Functionality**: This API call gets all archived notes of the user from the db.

### 2. POST `/notes/archives/:noteId`

- **Request URL**: `/api/archives/:noteId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      notes: Array,
      archives: Array
    }
  }
  ```

- **Functionality**: This API call adds a note for the user's archives in the db.

### 3. POST `/api/archives/restore/:noteId`

- **Request URL**: `/api/archives/restore/:noteId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      notes: Array,
      archives: Array
    }
  }
  ```

- **Functionality**: This API call restores a note for the user's archives in the db.

### 3. DELETE `/api/archives/delete/:noteId`

- **Request URL**: `/api/archives/delete/:noteId`
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

- **Functionality**: This API call restores a note for the user's archives in the db.

---

## Trash Routes

### 1. GET `/api/trash`

- **Request URL**: `/api/trash`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      trash: Array;
    }
  }
  ```

- **Functionality**: This API call gets all trashed notes of the user from the db.

### 2. POST `/notes/trash/:noteId`

- **Request URL**: `/api/trash/:noteId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      notes: Array,
      trash: Array
    }
  }
  ```

- **Functionality**: This API call adds a note for the user's trashed in the db.

### 3. POST `/api/trash/restore/:noteId`

- **Request URL**: `/api/trash/restore/:noteId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      notes: Array,
      trash: Array
    }
  }
  ```

- **Functionality**: This API call restores a note for the user's trashed in the db.

### 3. DELETE `/api/trash/delete/:noteId`

- **Request URL**: `/api/trash/delete/:noteId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      trash: Array;
    }
  }
  ```

- **Functionality**: This API call restores a note for the user's trashed in the db.
