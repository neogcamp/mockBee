import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to User History are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting videos from user's history.
 * send GET Request at /api/user/history
 * */
export const getHistoryVideosHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        401,
        {},
        { errors: ["The token is invalid. Unauthorized access error."] }
      );
    }
    return new Response(200, {}, { history: user.history });
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

/**
 * This handler handles adding videos to user's history.
 * send POST Request at /api/user/history
 * body contains {video}
 * */

export const addVideoToHistoryHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        401,
        {},
        { errors: ["The token is invalid. Unauthorized access error."] }
      );
    }
    const { video } = JSON.parse(request.requestBody);
    user.history.push(video);
    return new Response(201, {}, { history: user.history });
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

/**
 * This handler handles removing videos from user's history.
 * send DELETE Request at /api/user/history/:videoId
 * */

export const removeVideoFromHistoryHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        401,
        {},
        { errors: ["The token is invalid. Unauthorized access error."] }
      );
    }
    const videoId = request.params.videoId;
    const filteredHistory = user.history.filter((item) => item._id !== videoId);
    this.db.users.update({ history: filteredHistory });
    return new Response(200, {}, { history: filteredHistory });
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

/**
 * This handler handles removing videos from user's history.
 * send DELETE Request at /api/user/history/all
 * */

export const clearHistoryHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        401,
        {},
        { errors: ["The token is invalid. Unauthorized access error."] }
      );
    }
    this.db.users.update({ history: [] });
    return new Response(200, {}, { history: [] });
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
