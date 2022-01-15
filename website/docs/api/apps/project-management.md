# Project Management

**Project Management** is an application that is used to track and manage multiple projects. Create Projects, Add Tasks and also label them! You can edit, archive and delete tasks as per your convinience.

---

## Auth Routes

In `Project Management App`, the authentication is done with `email` and `password` credential fields.

You can refer documentation related to Authentication [here](/docs/api/general/auth)

---

## Project Routes

The following Routes are relating to Projects. These are Privately accessible routes.

### 1. GET `/api/projects`

- **Request URL**: `/api/projects`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      projects: Array
    }
  }
  ```

- **Functionality**: This API call gets all user's projects from the db.

### 2. GET `/api/projects/:projectId`

- **Request URL**: `/api/projects/:projectId`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      project: Object
    }
  }
  ```

- **Functionality**: This API call gets a particular user project from the db.

### 3. POST `/api/projects`

- **Request URL**: `/api/projects`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:

  ```js
  {
    project
  }
  ```

- **Response Body**:

  ```js
  {
    data: {
      projects: Array
    }
  }
  ```

- **Functionality**: This API call creates a new user project in the db.

### 4. POST `/api/projects/:projectId`

- **Request URL**: `/api/projects/:projectId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:

  ```js
  {
    project
  }
  ```

- **Response Body**:

  ```js
  {
    data: {
      projects: Array
    }
  }
  ```

- **Functionality**: This API call edits a user project in the db.

### 5. DELETE `/api/projects/:projectId`

- **Request URL**: `/api/projects/:projectId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`

- **Response Body**:

  ```js
  {
    data: {
      projects: Array
    }
  }
  ```

- **Functionality**: This API call deletes a user project in the db.

---

## Task Routes

The following Routes are relating to Task. These are Privately accessible routes.

### 1. GET `/api/tasks/:projectId`

- **Request URL**: `/api/tasks/:projectId`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:
  ```js
  {
    data: {
      tasks: Array
    }
  }
  ```

- **Functionality**: This API call gets all user's tasks of a particular project from the db.

### 2. GET `/api/tasks/:projectId/:taskId`

- **Request URL**: `/api/tasks/:projectId/:taskId`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:
  ```js
  {
    data: {
      task: Object
    }
  }
  ```

- **Functionality**: This API call gets user's task of a particular project from the db.

### 3. POST `/api/tasks/:projectId/`

- **Request URL**: `/api/tasks/:projectId/`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    task
  }
  ```
- **Response Body**:
  ```js
  {
    data: {
      tasks: Array
    }
  }
  ```

- **Functionality**: This API call adds a task to user project from the db.

### 4. POST `/api/tasks/:projectId/:taskId`

- **Request URL**: `/api/tasks/:projectId/:taskId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    task
  }
  ```
- **Response Body**:
  ```js
  {
    data: {
      tasks: Array
    }
  }
  ```

- **Functionality**: This API call gets user's task of a particular project from the db.

### 5. DELETE `/api/tasks/:projectId/:taskId`

- **Request URL**: `/api/tasks/:projectId/:taskId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:
  ```js
  {
    data: {
      tasks: Array
    }
  }
  ```

- **Functionality**: This API call gets user's task of a particular project from the db.

## Label Routes

The following Routes are relating to Labels. These are Privately accessible routes.

### 1. GET `/api/labels/:projectId`

- **Request URL**: `/api/labels/:projectId`
- **HTTP Method**: GET
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:
  ```js
  {
    data: {
      labels: Array
    }
  }
  ```

- **Functionality**: This API call gets all user's labels of a particular project from the db.

### 2. POST `/api/labels/:projectId/:labelName`

- **Request URL**: `/api/labels/:projectId/:labelName`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:
  ```js
  {
    data: {
      labels: Array
    }
  }
  ```

- **Functionality**: This API call adds a new label of a particular project from the db.

### 3. DELETE `/api/labels/:projectId/:labelName`

- **Request URL**: `/api/labels/:projectId/:labelName`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:
  ```js
  {
    data: {
      labels: Array
    }
  }
  ```

- **Functionality**: This API call deletes a label of a particular project from the db.

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
      archives: Array
    }
  }
  ```

- **Functionality**: This API call gets all user's archives from the db.

### 2. POST `/api/archives/:projectId/:taskId`

- **Request URL**: `/api/archives/:projectId/:taskId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:
  ```js
  {
    data: {
      archives: Array,
      tasks: Array
    }
  }
  ```

- **Functionality**: This API call archives a task of a particular project from the db.

### 3. POST `/api/archives/restore/:taskId`

- **Request URL**: `/api/archives/restore/:taskId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:
  ```js
  {
    data: {
      archives: Array,
      tasks: Array
    }
  }
  ```

- **Functionality**: This API call restores an archived task of a particular project from the db.

### 4. DELETE `/api/archives/delete/:taskId`

- **Request URL**: `/api/archives/delete/:taskId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:
  ```js
  {
    data: {
      archives: Array
    }
  }
  ```

- **Functionality**: This API call deletes an archived task of a particular project from the db.


