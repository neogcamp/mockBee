import { Server, Model, RestSerializer } from "miragejs";
import { posts } from "./backend/db/posts";
import { users } from "./backend/db/users";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import { createPostHandler, getAllpostsHandler, getPostHandler, deletePostHandler, editPostHandler, likePostHandler, dislikePostHandler} from "./backend/controllers/PostController";
import { getAllUsersHandler, getUserHandler } from "./backend/controllers/UserController";
export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      post: Model,
      user: Model,
    },

    // Runs on the start of the server
    seeds(server) {

      users.forEach((item) =>
        server.create("user", { ...item, cart: [], wishList: [] })
      );
      posts.forEach((item) =>
        server.create("post", { ...item})
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

       // post routes (public)
       this.get("/posts", getAllpostsHandler.bind(this));
       this.get("/posts/:postId", getPostHandler.bind(this));
       
       // post routes (private)
       this.post("/posts", createPostHandler.bind(this));
       this.delete("/posts/:postId", deletePostHandler.bind(this));
       this.post("/posts/edit/:postId", editPostHandler.bind(this));
       this.post("/posts/like/:postId", likePostHandler.bind(this));
       this.post("/posts/dislike/:postId", dislikePostHandler.bind(this));
       
       // user routes (public)
       this.get("/users", getAllUsersHandler.bind(this));
       this.get("/users/:userId", getUserHandler.bind(this));
    },
  });
  return server;
}
