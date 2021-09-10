import { Server } from "miragejs";
import books from "./json/books.json";

export const makeServer = () => {
  // Create new server
  let server = new Server({
    // Routes
    routes() {
      this.namespace = "api";
      // Get API
      this.get("/books", (schema) => {
        return books;
      });

      this.get("/auth", () => {
        const jwt = require('jsonwebtoken')
        const encodedToken = jwt.sign({ message: "YOU'VE DECODED ME!"}, "123456")
        return { encodedToken: encodedToken }
      })

      // Post API
      this.post("/add", (schema, request) => {
        console.log(request);
        // Get Data and parse it
        const newBook = JSON.parse(request.requestBody);
        // Push Data into our database (fake)
        books.push(newBook);
      });
    },
  });

  return server;
};
