import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Project Label are present here.
 * These are Privately accessible routes.
 * */

/**
 * This handler handles getting user project labels.
 * send GET Request at /api/labels/:projectId
 * */

export const getLabelsHandler = function (schema, request) {
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
  return new Response(200, {}, { labels: project.labels });
};

/**
 * This handler handles editing user project labels.
 * send GET Request at /api/labels/:projectId/:labelName/edit
 * */

export const editLabelHandler = function (schema, request) {
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

  const { label } = JSON.parse(request.requestBody);
  const { projectId, labelName } = request.params;

  const project = user.projects.find((project) => project._id === projectId);
  let labelIndex = project.labels.findIndex((label) => label === labelName);
  project.labels[labelIndex] = label;
  this.db.users.update({ _id: user._id }, user);

  return new Response(200, {}, { labels: project.labels });
};

/**
 * This handler handles creating user project labels.
 * send POST Request at /api/labels/:projectId/:labelName
 * */

export const createLabelHandler = function (schema, request) {
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
  const { projectId, labelName } = request.params;
  const project = user.projects.find((project) => project._id === projectId);
  if (project.labels.includes(labelName)) {
    return new Response(
      409,
      {},
      { errors: ["Duplicate data found. Label name must be unique."] }
    );
  }
  project.labels.push(labelName);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { project });
};

/**
 * This handler handles deleting user project labels.
 * send DELETE Request at /api/labels/:projectId/:labelName
 * */

export const deleteLabelHandler = function (schema, request) {
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
  const { projectId, labelName } = request.params;
  const project = user.projects.find((project) => project._id === projectId);
  project.labels = project.labels.filter((label) => label !== labelName);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { project });
};
