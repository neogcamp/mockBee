# Getting App Running

Once our database is configured, running the App is quite straight-forward.

But before that, let us take a quick look at `index.js`

### Calling `makeServer()`

You can find the code below in your `index.js` when you install the app.

```jsx
import { makeServer } from "./server";

// Call make Server
makeServer();
```

It is intuitive that the `server.js` must be exporting `makeServer()` function, which is being called in the entry-point of our Frontend App.

In this way, the server and it's APIs are made available to the frontend.

Of course, we don't need to look more into what is inside the `server.js` at the moment; and let us get our app running!

### Running the App

This step is the same as in all other CRAs. To run the app write the following command in your terminal

```bash
yarn start
```

This should run the app on `localhost:3000`.

### Winding up

Kudos! You have successfully set up your MockB React App 🚀

Now, on top of this; you can start building your frontend as you like.

#### Next Steps

- Using `fetch()`, now you can access the APIs for your respective app!
  Find API Documentation of your app [here](api/introduction)
- Want to read more on the whys and hows of **MockB**, miragejs, customization, available APIs and more?
  We have curated some Guides [here](why-miragejs-mock-backend)
- Interested in exploring main concepts, how to add custom APIs and resources for learning miragejs?
  Make sure you visit [Advanced Guides](main-concepts)
