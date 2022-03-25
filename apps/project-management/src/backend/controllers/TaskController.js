import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Tasks are present here.
 * These are Privately accessible routes.
 * */

/**
 * This handler handles getting user project tasks.
 * send GET Request at /api/tasks/:projectId
 * */

export const getTasksHandler = function (schema, request) {
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
  const projectId = request.params.projectId;
  const project = user.projects.find((project) => project._id === projectId);
  return new Response(200, {}, { tasks: project.tasks });
};

/**
 * This handler handles getting user project task.
 * send GET Request at /api/tasks/:projectId/:taskId
 * */

export const getTaskHandler = function (schema, request) {
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
  const { projectId, taskId } = request.params;
  const project = user.projects.find((project) => project._id === projectId);
  const task = project.tasks.find((task) => task._id === taskId);
  return new Response(200, {}, { task });
};

/**
 * This handler handles creating new task to user project.
 * send POST Request at /api/tasks/:projectId/
 * body contains {task}
 * */

export const createTaskHandler = function (schema, request) {
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
  const projectId = request.params.projectId;
  const { task } = JSON.parse(request.requestBody);
  const project = user.projects.find((project) => project._id === projectId);
  const newTask = { ...task, projectId, _id: uuid() };
  project.tasks.push(newTask);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { tasks: project.tasks });
};

/**
 * This handler handles editing a task to user project.
 * send POST Request at /api/tasks/:projectId/:taskId
 * body contains {task}
 * */

export const editTaskHandler = function (schema, request) {
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
  const { projectId, taskId } = request.params;
  const { task } = JSON.parse(request.requestBody);
  const project = user.projects.find((project) => project._id === projectId);
  let taskIndex = project.tasks.findIndex((task) => task._id === taskId);
  project.tasks[taskIndex] = {
    ...project.tasks[taskIndex],
    ...task,
  };
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { tasks: project.tasks });
};

/**
 * This handler handles deleting a task to user project.
 * send DELETE Request at /api/tasks/:projectId/:taskId
 * */

export const deleteTaskHandler = function (schema, request) {
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
  const { projectId, taskId } = request.params;
  const project = user.projects.find((project) => project._id === projectId);
  project.tasks = project.tasks.filter((task) => task._id !== taskId);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { tasks: project.tasks });
};
