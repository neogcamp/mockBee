import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import { users } from "./backend/db/users";
import {
  getProjectsHandler,
  getProjectHandler,
  createProjectHandler,
  editProjectHandler,
  deleteProjectHandler,
} from "./backend/controllers/ProjectController";
import {
  createTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  getTaskHandler,
  getTasksHandler,
} from "./backend/controllers/TaskController";
import {
  createLabelHandler,
  deleteLabelHandler,
  getLabelsHandler,
} from "./backend/controllers/LabelController";
import {
  archiveTaskHandler,
  deleteFromArchivesHandler,
  getAllArchivedTasksHandler,
  restoreFromArchivesHandler,
} from "./backend/controllers/ArchiveController";

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
          projects: [],
          archives: [],
        })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // project routes (private)
      this.get("projects", getProjectsHandler.bind(this));
      this.post("projects", createProjectHandler.bind(this));
      this.get("projects/:projectId", getProjectHandler.bind(this));
      this.post("projects/:projectId", editProjectHandler.bind(this));
      this.delete("projects/:projectId", deleteProjectHandler.bind(this));

      // task routes (private)
      this.get("tasks/:projectId", getTasksHandler.bind(this));
      this.get("tasks/:projectId/:taskId", getTaskHandler.bind(this));
      this.post("tasks/:projectId", createTaskHandler.bind(this));
      this.post("tasks/:projectId/:taskId", editTaskHandler.bind(this));
      this.delete("tasks/:projectId/:taskId", deleteTaskHandler.bind(this));

      // label routes (private)
      this.get("labels/:projectId", getLabelsHandler.bind(this));
      this.post("labels/:projectId/:labelName", createLabelHandler.bind(this));
      this.delete(
        "labels/:projectId/:labelName",
        deleteLabelHandler.bind(this)
      );

      // archive routes (private)
      this.get("archives", getAllArchivedTasksHandler.bind(this));
      this.post("archives/:projectId/:taskId", archiveTaskHandler.bind(this));
      this.post(
        "archives/restore/:taskId",
        restoreFromArchivesHandler.bind(this)
      );
      this.delete(
        "archives/delete/:taskId",
        deleteFromArchivesHandler.bind(this)
      );
    },
  });
  return server;
}
