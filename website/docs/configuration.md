# Configuration

Configuring your app involves adding your custom database. You can find the database corresponding to your project in the `/src/backend/db` folder.

This folder contains various files which explore the data to be utilized in your project.

For instance, the E-Commerce App's `db` folder looks something like this.

```
db/
├── products.js
├── users.js
├── categories.js
```

### How it works

Essentially, when you run your app on dev-server; the data exported from these files are made available to the server. Say, if you request for products by making a GET request to the backend; it will respond with this data.

So, based on your requirements; you can alter the data in this files.

Now, let us try altering the products by editing e-commerce app's `products.js` to add custom data.

On installation, the `products.js` file of e-commerce app will look something like:

```js
import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: "You Can WIN",
    author: "Shiv Khera",
    price: "5000",
    categoryName: "non-fiction",
  },
  {
    _id: uuid(),
    title: "You are Winner",
    author: "Junaid Qureshi",
    price: "3000",
    categoryName: "horror",
  },
  {
    _id: uuid(),
    title: "Think and Grow Rich",
    author: "Shiv Khera",
    price: "1000",
    categoryName: "fiction",
  },
];
```

You must have observed that this contains books database as our products. A typical book has title, author, price etc. attributes, and thus it is added here.

Also note the `_id: uuid()`. This line of code generates a Unique ID for each item, which can be later used to DB Operations. It is compulsory to have `_id` key in the database items.

### Adding Custom Data

What if you want to build your own T-Shirt Shop?

The Database would change, right? But since it is an E-Commerce Shop, it will have basic features like products, cart, wishlist etc. which are already provided by the mockBee API.

Let us change the file to achieve this -

```js
import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    name: "Solid Men Mandarin Collar White, Blue T-Shirt",
    company: "FastColors",
    price: "294",
    rating: "4",
    imageURL: "xyz.com/image.png",
  },
  {
    _id: uuid(),
    name: "Printed Women Round Neck Black",
    company: "Kara",
    price: "994",
    rating: "4.5",
    imageURL: "abc.com/image1.png",
  },
  {
    _id: uuid(),
    name: "Men Polo Neck White, Black T-Shirt",
    company: "Allen Solly",
    price: "649",
    rating: "2",
    imageURL: "yzx.com/image2.png",
  },
];
```

In this way, now the Products and it's attributes is configured. On making corresponding GET request, you can now get the customized data.

### A bit into `server.js`

In the `server.js` file of the E-Commerce App (here, as an example), you can see the code below

```jsx
// Runs on the start of the server
seeds(server) {
    products.forEach((item) => {
    server.create("product", { ...item });
    });

    users.forEach((item) =>
    server.create("user", { ...item, cart: [], wishList: [] })
    );

    categories.forEach((item) =>
    server.create("category", { ...item}));
},
```

The `products.js`, `users.js` and `categories.js` export _product_, _users_ and categories respectively which contains our customized data.

**seeds** hook seeds Mirage with some initial data when the server is started.

Here with the help of `server.create('databaseName', object)`, the db items are added to our backend.

And if this is sounding a bit overwhelming, don't worry if you don't understand the whole code. The whole point of `mockBee` is to abstract the hard-parts out and let you do frontend!

### Winding Up

Configuring Data with mockBee is simple. You technically just need to change the contents of the files inside the `db` folder. Everything else is handled by **mockBee**
