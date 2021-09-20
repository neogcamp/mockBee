import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
  logoutHandler,
} from "./backend/controllers/AuthController";
import { getAllVideosHandler } from "./backend/controllers/VideoController";
import { videos } from "./backend/db/videos";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      video: Model,
      category: Model,
      user: Model,
      like: Model,
      history: Model,
      playlist: Model
    },

    // Runs on the start of the server
    seeds(server) {
      videos.forEach((item) => {
        server.create("video", { ...item });
      });
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));
      this.post("/auth/logout", logoutHandler.bind(this));

      // video routes (public)
      this.get("/videos", getAllVideosHandler.bind(this));
    }
  });
  return server;
}
