# Forum App

**Forum App** is an app where users can ask questions, get answers, comments, replies and more. User can also upvote and downvote questions and answers in the application. It is similar to Quora or Stackoverflow application.

---

## Auth Routes

In `Forum App`, the authentication is done with `username` and `password` credential fields.

You can refer documentation related to Authentication [here](/docs/api/general/auth)

---

## User Routes

The following Routes are relating to Users. Below are Publicly accessible routes.

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

- **Functionality**: This API call gets all users from the db.

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

- **Functionality**: This API call gets a particular user from the db.

---

Below are Privately accessible routes.

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

- **Functionality**: This API call edits a user to the db.

### 4. POST `/api/users/follow/:followUserId`

- **Request URL**: `/api/users/follow/:followUserId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**: {}
- **Response Body**:

  ```js
  {
    data: {
      user: Object;
      followUser: Object;
    }
  }
  ```

- **Functionality**: This API call is responsible for follow action by the user.

### 5. POST `/api/users/unfollow/:followUserId`

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

---

## Questions Routes

The following Routes are relating to Questions. Below are Publicly accessible routes.

### 1. GET `/api/questions`

- **Request URL**: `/api/questions`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      questions: Array;
    }
  }
  ```

- **Functionality**: This API call gets all questions from the db.

### 2. GET `/api/questions/:questionId`

- **Request URL**: `/api/questions/:questionId`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      question: Object;
    }
  }
  ```

- **Functionality**: This API call gets a particular question from the db.

### 3. GET `/api/questions/:username`

- **Request URL**: `/api/questions/:username`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      questions: Array;
    }
  }
  ```

- **Functionality**: This API call gets all questions by username from the db.

---

Below are Privately accessible routes.

### 4. POST `/api/questions/add`

- **Request URL**: `/api/questions/add`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    questionData;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      questions: Array;
    }
  }
  ```

- **Functionality**: This API call adds a question to the db.

### 5. POST `/api/questions/edit/:questionId`

- **Request URL**: `/api/questions/edit/:questionId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    questionData;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      questions: Array;
    }
  }
  ```

- **Functionality**: This API call edits a question in the db.

### 6. DELETE `/api/questions/delete/:questionId`

- **Request URL**: `/api/questions/delete/:questionId`
- **HTTP Method**: DELETE
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:
  ```js
  {
    data: {
      questions: Array;
    }
  }
  ```
- **Functionality**: This API call deletes a question in the db.

## Answer Routes

The following Routes are relating to Answers. Below are Publicly accessible routes.

### 1. GET `/api/answers/:questionId`

- **Request URL**: `/api/answers/:questionId`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      answers: Array;
    }
  }
  ```

- **Functionality**: This API call gets all answers of a particular question from the db.

---

Below are Privately accessible routes.

### 2. POST `/api/answers/add/:questionId`

- **Request URL**: `/api/answers/add/:questionId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    answerData;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      answers: Array;
    }
  }
  ```

- **Functionality**: This API call adds an answer to the question in the db.

### 3. POST `/api/answers/edit/:questionId/:answerId`

- **Request URL**: `/api/answers/edit/:questionId/:answerId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Request Body**:
  ```js
  {
    answerData;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      answers: Array;
    }
  }
  ```

- **Functionality**: This API call edits an answer of the question in the db.

### 4. DELETE `/api/answers/delete/:questionId/:answerId`

- **Request URL**: `/api/answers/edit/:questionId/:answerId`
- **HTTP Method**: POST
- **Request Headers**: `authorization: encodedToken`
- **Response Body**:

  ```js
  {
    data: {
      answers: Array;
    }
  }
  ```

- **Functionality**: This API call deletes an answer of the question in the db.

## Votes Routes

The following Routes are relating to Votes. Below are Publicly accessible routes.

### 1. GET `/api/votes/:questionId`

- **Request URL**: `/api/votes/:questionId`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      votes: Array;
    }
  }
  ```

- **Functionality**: This API call gets all votes of a question from the db.

### 2. GET `/api/votes/:questionId/:answerId`

- **Request URL**: `/api/votes/:questionId/:answerId`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      votes: Array;
    }
  }
  ```

- **Functionality**: This API call gets all votes of an answer to a question from the db.

---

Below are Privately accessible routes.

### 3. POST `/api/votes/react/:questionId`

- **Request URL**: `/api/votes/react/:questionId`
- **HTTP Method**: POST
- **Request Body**:

  ```js
  {
    vote: {
      reaction: "upvote" | "unvote" | "downvote";
    }
  }
  ```

- **Response Body**:

  ```js
  {
    data: {
      votes: Array;
    }
  }
  ```

- **Functionality**: This API call reacts to a question from the db.

### 4. POST `/api/votes/react/:questionId/:answerId`

- **Request URL**: `/api/votes/react/:questionId/:answerId`
- **HTTP Method**: POST
- **Request Body**:

  ```js
  {
    vote: {
      reaction: "upvote" | "unvote" | "downvote";
    }
  }
  ```

- **Response Body**:

  ```js
  {
    data: {
      votes: Array;
    }
  }
  ```

- **Functionality**: This API call reacts to an answer of a question from the db.

## Comment Routes

The following Routes are relating to Comments. Below are Publicly accessible routes.

### 1. GET `/api/comments/:questionId`

- **Request URL**: `/api/comments/:questionId`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      comments: Array;
    }
  }
  ```

- **Functionality**: This API call gets all comments of a question from the db.

### 2. GET `/api/comments/:questionId/:answerId`

- **Request URL**: `/api/comments/:questionId`
- **HTTP Method**: GET
- **Response Body**:

  ```js
  {
    data: {
      comments: Array;
    }
  }
  ```

- **Functionality**: This API call gets all comments of an answer to a question from the db.

---

Below are Privately accessible routes.

### 3. POST `/api/comments/add/:questionId`

- **Request URL**: `/api/comments/add/:questionId`
- **HTTP Method**: POST
- **Request Body**:

  ```js
  {
    commentData;
  }
  ```

- **Response Body**:

  ```js
  {
    data: {
      comments: Array;
    }
  }
  ```

- **Functionality**: This API call adds a comment to question from the db.

### 4. POST `/api/comments/edit/:questionId/:commentId`

- **Request URL**: `/api/comments/edit/:questionId/:commentId`
- **HTTP Method**: POST
- **Request Body**:
  ```js
  {
    commentData;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      comments: Array;
    }
  }
  ```

- **Functionality**: This API call edits a comment to question from the db.

### 5. DELETE `/api/comments/delete/:questionId/:commentId`

- **Request URL**: `/api/comments/delete/:questionId/:commentId`
- **HTTP Method**: DELETE
- **Response Body**:

  ```js
  {
    data: {
      comments: Array;
    }
  }
  ```

- **Functionality**: This API call deletes a comment of a question from the db.

### 6. POST `/api/comments/add/:questionId/:answerId`

- **Request URL**: `/api/comments/add/:questionId/:answerId`
- **HTTP Method**: POST
- **Request Body**:
  ```js
  {
    commentData;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      comments: Array;
    }
  }
  ```

- **Functionality**: This API call adds a comment to an answer of a question from the db.

### 7. POST `/api/comments/edit/:questionId/:answerId/:commentId`

- **Request URL**: `/api/comments/edit/:questionId/:answerId/:commentId`
- **HTTP Method**: POST
- **Request Body**:
  ```js
  {
    commentData;
  }
  ```
- **Response Body**:

  ```js
  {
    data: {
      comments: Array;
    }
  }
  ```

- **Functionality**: This API call edits a comment to an answer of a question from the db.

### 8. POST `/api/comments/delete/:questionId/:answerId/:commentId`

- **Request URL**: `/api/comments/delete/:questionId/:answerId/:commentId`
- **HTTP Method**: DELETE`
- **Response Body**:

  ```js
  {
    data: {
      comments: Array;
    }
  }
  ```

- **Functionality**: This API call deletes a comment to an answer of a question from the db.
