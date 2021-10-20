import {
    loginHandler,
    signupHandler,
  } from "./backend/controllers/AuthController";
import { getAllUsersHandler, getUserHandler, editUserHandler } from "./backend/controllers/UserController";
import { Server, Model, RestSerializer } from "miragejs";
import { users } from "./backend/db/users";
export function makeServer({ environment = "development" } = {}) {
    let server = new Server({
      serializers: {
        application: RestSerializer,
      },
      environment,
      models: {
        user: Model,
      },
  
      // Runs on the start of the server
      seeds(server) {
        users.forEach((item) =>
        server.create("user", { ...item, cart: [], wishList: [] })
      );
      },
  
      routes() {
        this.namespace = "api";
        // auth routes (public)
        this.post("/auth/signup", signupHandler.bind(this));
        this.post("/auth/login", loginHandler.bind(this));

        // user routes (public)
        this.get("/users", getAllUsersHandler.bind(this));
        this.get("/users/:userId", getUserHandler.bind(this));

       // user routes (private)
       this.post("users/edit", editUserHandler.bind(this))

  
    },
    });
    return server;
  }
  