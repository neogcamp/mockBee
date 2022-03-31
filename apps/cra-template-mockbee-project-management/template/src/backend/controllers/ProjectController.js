import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Project are present here.
 * These are Privately accessible routes.
 * */

/**
 * This handler handles getting user projects.
 * send GET Request at /api/projects
 * */

export const getProjectsHandler = function (schema, request) {
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
  return new Response(200, {}, { projects: user.projects });
};

/**
 * This handler handles getting user projects.
 * send GET Request at /api/projects/:projectId
 * */

export const getProjectHandler = function (schema, request) {
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
  return new Response(200, {}, { project });
};

/**
 * This handler handles creating a user project.
 * send POST Request at /api/projects
 * body contains {project}
 * */

export const createProjectHandler = function (schema, request) {
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
  const { project } = JSON.parse(request.requestBody);
  const createdProject = {
    _id: uuid(),
    tasks: [],
    labels: [],
    ...project,
  };
  user.projects.push(createdProject);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { projects: user.projects });
};

/**
 * This handler handles editing user projects.
 * send POST Request at /api/projects/:projectId
 * body contains {project}
 * */

export const editProjectHandler = function (schema, request) {
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
  const { project } = JSON.parse(request.requestBody);
  const projectId = request.params.projectId;
  const projectIndex = user.projects.findIndex(
    (project) => project._id === projectId
  );
  user.projects[projectIndex] = { ...user.projects[projectIndex], ...project };
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { projects: user.projects });
};

/**
 * This handler handles deleting user projects.
 * send DELETE Request at /api/projects/:projectId
 * */

export const deleteProjectHandler = function (schema, request) {
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
  user.projects = user.projects.filter((project) => project._id !== projectId);
  user.archives = user.archives.filter(
    (archive) => archive.projectId !== projectId
  );
  this.db.users.update({ _id: user._id }, user);
  return new Response(
    200,
    {},
    { projects: user.projects, archives: user.archives }
  );
};
