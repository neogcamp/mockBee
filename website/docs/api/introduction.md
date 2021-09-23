# Introduction

APIs are the heart of **MockB**; and best part is you necessarily need to write them in order to use them!

In the industry, **frontend developers** are given the API endpoints and are expected to build the UI, mingle with Data and do request-response with the APIs.

With **MockB**, You can perform different actions and implement various features by interacting with the available APIs. These APIs are designed keeping in mind the use-case and project.

Since these are Mock-APIs, they are amazing for **personal projects** or **product prototypes**; but for real application, real backend needs to be written.

### API Structure

- This API documentation is made beginner-friendly, and thus the concepts and implementation details are provided on the fly.
- MockB provides **REST APIs**
- Every API Request will have the following

  - **REQUEST URL** - Example URLS: `/api/auth/login`
  - **HTTP METHOD** - Example methods: **GET**, **POST**, **PUT**, etc.)
  - **REQUEST HEADERS** - Example header: **authorization: "xxxxxx"**
  - **REQUEST BODY** - Example request: `{email, password})`
  - **RESPONSE BODY** -
    Example response:

    ```js
    {
      msg: "success",
          data: {
            _id: "233",
            email,
            firstName,
            lastName,
            cart: [],
            wishList: [],
          },
    };
    ```

  - **Functionality** - Contains brief info about what this API does.

- The **General APIs** (such as `Auth` etc.) can be found in **General** Section; while **App-specific APIs** (such as `E-Commerce`, `Video-Library` etc.) are structured inside **Apps**.
- The APIs are broadly classified as **Public** and **Private**. The Public ones are accessible publicly, however Private ones need some work.
- **MockB** uses JWT Authentication Strategy. So, for accessing **Private** routes, you need to add `JWT Token` as `authorization` header in all the requests that try to access these. Read more about this [here](general/auth)

### Available APIs

- [E-Commerce](apps/e-commerce)
- [Video Library](apps/video-library)
