# Customization

This section will brief about how to add custom APIs (or update existing APIs) in your existing mockbee template.

### Design an API

- Decide

  - End Point (the url that you call from frontend)
  - Methods (get, post etc.)
  - Does it require Authentication?
  - What the API returns
  - What is the logic you want to put

- Think in terms of Input -> Processing -> Output
- View other implementations of the APIs too in the project
- All the `logic` is present inside `backend/controllers`, `data` is in `backend/db` and utility functions in `backend/utils`.
- The API endpoints are present in `server.js`
- You can update or add new based on this

### Inside Backend Folder...

- In the `/src/backend`, there are three folders:

  - controllers
  - db
  - utils

- First, you can add a Handler function in corresponding `controllers` file. If you are adding new API or feature, you can create a new file as `NewFeatureController.js`.
- Add your logic inside that function. (Have a look at the code of other handlers to understand how you can also implement the same)
- If you need some pre-seeding data for your feature, add inside `db`.
- Any reusable utilities can be put inside `utils`.

### Add API Endpoint inside `server.js`

1. If you have any new models added, add it in models object. (Have a look at other added models)
2. Add seeding data from db if anything new entry is in pre-seed.
3. Inside routes, the routes are added as: `this.methodName(endpoint, callback)
4. The callbacks are bind with `this` because we want to use `this` reference in our handler function for db, authUtils etc.

### Checking its working

- Test the APIs with `mockman-js`.
- Integrate in App after the api endpoints are working well.

### Further Steps

- We are using `mirage-js` for mock-backend. You can read these imp guides which are there on their official documentation:

* [Tutorial](https://miragejs.com/tutorial/intro/)
* [Basic Fundamentals](https://miragejs.com/docs/getting-started/introduction/)
* [Route Handling](https://miragejs.com/docs/main-concepts/route-handlers/)
* [Database](https://miragejs.com/docs/main-concepts/database/)
* [Custom Response](https://miragejs.com/api/classes/response/)
