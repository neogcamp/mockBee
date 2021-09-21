import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
  logoutHandler,
} from "./backend/controllers/AuthController";
import { getHistoryVideosHandler, addVideoToHistoryHandler , removeVideoFromHistoryHandler, clearHistoryHandler} from "./backend/controllers/HistoryController";
import { getAllVideosHandler, getVideoHandler } from "./backend/controllers/VideoController";
import { videos } from "./backend/db/videos";
import { categories } from "./backend/db/categories";
import { getAllCategoriesHandler, getCategoryHandler } from "./backend/controllers/CategoryController";
import { getLikedVideosHandler, addItemToLikedVideos, removeItemFromLikedVideos } from "./backend/controllers/LikeController";
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
      categories.forEach((item) =>
      server.create("category", { ...item}));
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));
      this.post("/auth/logout", logoutHandler.bind(this));

      // video routes (public)
      this.get("/videos", getAllVideosHandler.bind(this));
      this.get("video/:videoId", getVideoHandler)

      // TODO: POST VIDEO TO DB 

      // categories routes (public)
      this.get("/categories", getAllCategoriesHandler.bind(this));
      this.get("/categories/:categoryId", getCategoryHandler.bind(this));

      // likes routes (private)
      this.get("/user/likes", getLikedVideosHandler.bind(this));
      this.post("/user/likes", addItemToLikedVideos.bind(this));
      this.delete("/user/likes", removeItemFromLikedVideos.bind(this));

      // // playlist routes (private)
      // this.get("/user/playlists", getAllPlaylistsHandler.bind(this));
      // this.post("/user/playlists", addItemToPlaylistsHandler.bind(this));
      // this.delete("/user/playlists", removeItemFromPlaylistHandler.bind(this));
      
      // this.get("/user/playlists/:playlistId", getVideosFromPlaylistHandler.bind(this));
      // this.post("/user/playlists/:playlistId", addVideoToPlaylistHandler.bind(this));
      // this.delete("/user/playlists/:playlistId", removeVideoFromPlaylistHandler.bind(this));

      // history routes (private)
      this.get("/user/history", getHistoryVideosHandler.bind(this));
      this.post("/user/history", addVideoToHistoryHandler.bind(this));
      this.delete("/user/history", removeVideoFromHistoryHandler.bind(this));
      this.delete("/user/history/all", clearHistoryHandler.bind(this));

      // TODO: Recommendations routes (private)
    }
  });
  return server;
}
