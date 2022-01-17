import { Server, Model, RestSerializer } from "miragejs";
import {
  archiveHabitHandler,
  deleteFromArchivesHandler,
  getAllArchivedHabitsHandler,
  restoreFromArchivesHandler,
} from "./backend/controllers/ArchiveController";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  createHabitHandler,
  deleteHabitHandler,
  editHabitHandler,
  getHabitHandler,
  getHabitsHandler,
} from "./backend/controllers/HabitController";
import {
  createLabelHandler,
  deleteLabelHandler,
  getLabelsHandler,
} from "./backend/controllers/LabelController";
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
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          habits: [],
          archives: [],
          labels: [],
        })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // habit routes (private)
      this.get("habits", getHabitsHandler.bind(this));
      this.get("habits/:habitId", getHabitHandler.bind(this));
      this.post("habits", createHabitHandler.bind(this));
      this.post("habits/:habitId", editHabitHandler.bind(this));
      this.delete("habits/:habitId", deleteHabitHandler.bind(this));

      // label routes (private)
      this.get("labels", getLabelsHandler.bind(this));
      this.post("labels/:labelName", createLabelHandler.bind(this));
      this.delete("labels/:labelName", deleteLabelHandler.bind(this));

      // archive routes (private)
      this.get("archives", getAllArchivedHabitsHandler.bind(this));
      this.post(
        "archives/restore/:habitId",
        restoreFromArchivesHandler.bind(this)
      );
      this.post("archives/:habitId", archiveHabitHandler.bind(this));
      this.delete("archives/:habitId", deleteFromArchivesHandler.bind(this));
    },
  });
  return server;
}
