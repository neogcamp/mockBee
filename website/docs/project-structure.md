# Project Structure

Let us explore the general Project Structure of the Apps provided by mockBee templates.

All Apps that you intend to build using **mockBee's backend** will have the following **Project Structure** after the installation process.

```
my-project
├── node_modules
├── public
│   ├── index.html
│   ├──favicon.ico
│   ├── ...
├── src
│   ├── App.jsx
│   ├── App.css
|   ├── index.js
│   ├── index.css
│   ├── server.js
│   └── backend
│       └── controllers
│           └── Controller1.js
│           └── Controller2.js
│       └── db
│           └── Database1.js
│           └── Database2.js
│       └── utils
│           └── Utility1.js
├── package.json
├── README.md
└── yarn.lock
```

### Project Structure Rundown

As you must have already observed, this is a typical `Create-React-App` with some extra capabilities.

- `/public` is the Page Template
- `/src/index.js` is the entry point

You can delete or rename the other files.

Below are the files related to Mock Backend. You don't need to worry much about what goes inside these files; we have abstracted it already for you!

- `/src/server.js` contains the backend server entry point.
- `/src/backend` contains
  - `/controllers` contains various Controller functions for handling various actions based on the requested route.
  - `/db` contains of Database that will be made available to the app
  - `/utils` contains various utility modular functions that are used across the backend

You can refer `README.md` file for more insights about the project you are working on.

### Project Dependencies

- **React** and **ReactDOM** - Frontend Library
- **MirageJS** - API Mocking Library
- **jwt-encode, jwt-decode** - For JWT Authentication
- **uuid** - For generating random IDs
- **day-js** - For date formatting
- **mockman-js** - For Testing APIs in the Browser

Feel free to extend the dependencies by installing more by running:

```bash
npm i package-name
yarn add package-name
```

### Winding Up

The Project Structure is made keeping in mind that you can create your frontend flexibly. Other folders for frontend such as `components`, `pages`, `redux`, `context` etc. can be added by following the general CRA project structure practices.
