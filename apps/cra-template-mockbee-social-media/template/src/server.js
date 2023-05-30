import { Server, Model, RestSerializer } from "miragejs";
import { posts } from "./backend/db/posts";
import { users } from "./backend/db/users";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  createPostHandler,
  getAllpostsHandler,
  getPostHandler,
  deletePostHandler,
  editPostHandler,
  likePostHandler,
  dislikePostHandler,
  getAllUserPostsHandler,
} from "./backend/controllers/PostController";
import {
  followUserHandler,
  getAllUsersHandler,
  getUserHandler,
  getBookmarkPostsHandler,
  bookmarkPostHandler,
  removePostFromBookmarkHandler,
  unfollowUserHandler,
  editUserHandler,
} from "./backend/controllers/UserController";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
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
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          followers: [],
          following: [],
          bookmarks: [],
        })
      );
      posts.forEach((item) => server.create("post", { ...item }));
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // post routes (public)
      this.get("/posts", getAllpostsHandler.bind(this));
      this.get("/posts/:postId", getPostHandler.bind(this));
      this.get("/posts/user/:username", getAllUserPostsHandler.bind(this));

      // post routes (private)
      this.post("/posts", createPostHandler.bind(this));
      this.delete("/posts/:postId", deletePostHandler.bind(this));
      this.post("/posts/edit/:postId", editPostHandler.bind(this));
      this.post("/posts/like/:postId", likePostHandler.bind(this));
      this.post("/posts/dislike/:postId", dislikePostHandler.bind(this));

      // user routes (public)
      this.get("/users", getAllUsersHandler.bind(this));
      this.get("/users/:userId", getUserHandler.bind(this));

      // user routes (private)
      this.post("users/edit", editUserHandler.bind(this));
      this.get("/users/bookmark", getBookmarkPostsHandler.bind(this));
      this.post("/users/bookmark/:postId/", bookmarkPostHandler.bind(this));
      this.post(
        "/users/remove-bookmark/:postId/",
        removePostFromBookmarkHandler.bind(this)
      );
      this.post("/users/follow/:followUserId/", followUserHandler.bind(this));
      this.post(
        "/users/unfollow/:followUserId/",
        unfollowUserHandler.bind(this)
      );
    },
  });
}
