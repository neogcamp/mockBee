import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Archives are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all archived tasks in the db.
 * send GET Request at /api/archives
 * */

export const getAllArchivedTasksHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  return new Response(200, {}, { archives: user.archives });
};

/**
 * This handler handles delete an archived task in the db.
 * send DELETE Request at /api/archives/:taskId
 * */

export const deleteFromArchivesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { taskId } = request.params;
  user.archives = user.archives.filter((task) => task._id !== taskId);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { archives: user.archives });
};

/**
 * This handler handles restoring the archived tasks to projects.
 * send POST Request at /api/archives/restore/:taskId
 * */

export const restoreFromArchivesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { taskId } = request.params;
  const restoredTask = user.archives.find((task) => task._id === taskId);
  user.archives = user.archives.filter((task) => task._id !== taskId);
  const project = user.projects.find(
    (project) => project._id === restoredTask.projectId
  );
  project.tasks.push({ ...restoredTask });
  this.db.users.update({ _id: user._id }, user);
  return new Response(
    200,
    {},
    { archives: user.archives, tasks: project.tasks }
  );
};

/**
 * This handler handles archiving a task
 * send POST Request at /api/archives/:taskId
 * */

export const archiveTaskHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { projectId, taskId } = request.params;
    const project = user.projects.find((project) => project._id === projectId);
    const archivedTask = project.tasks.filter((task) => task._id === taskId)[0];
    const filteredTasks = project.tasks.filter((task) => task._id !== taskId);
    project.tasks = filteredTasks;
    user.archives.push({ ...archivedTask });
    this.db.users.update({ _id: user._id }, user);
    return new Response(
      201,
      {},
      { archives: user.archives, tasks: project.tasks }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
