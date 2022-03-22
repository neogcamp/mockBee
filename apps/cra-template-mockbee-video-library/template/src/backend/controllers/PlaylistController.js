import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to User Playlists are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting all user's playlists.
 * send GET Request at /api/user/playlist
 * */
export const getAllPlaylistsHandler = function (schema, request) {
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
    return new Response(200, {}, { playlists: user.playlists });
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
 * This handler handles adding playlist to user's playlists.
 * send POST Request at /api/user/playlists
 * body contains {playlist: {title: "foo", description:"bar bar bar" }}
 * */

export const addNewPlaylistHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const { playlist } = JSON.parse(request.requestBody);
    user.playlists.push({ ...playlist, videos: [], _id: uuid() });
    return new Response(201, {}, { playlists: user.playlists });
  }
  return new Response(
    404,
    {},
    {
      errors: ["The email you entered is not Registered. Not Found error"],
    }
  );
};

/**
 * This handler handles removing videos from user's playlists.
 * send DELETE Request at /api/user/playlists/:playlistId
 * */

export const removePlaylistHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const playlistId = request.params.playlistId;
    const filteredPlaylists = user.playlists.filter(
      (item) => item._id !== playlistId
    );
    this.db.users.update({ playlists: filteredPlaylists });
    return new Response(200, {}, { playlists: filteredPlaylists });
  }
  return new Response(
    404,
    {},
    { errors: ["The user you request does not exist. Not Found error."] }
  );
};

/**
 * This handler handles getting videos from user's playlist.
 * send GET Request at /api/user/playlists/:playlistId
 * */

export const getVideosFromPlaylistHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const playlistId = request.params.playlistId;
    const playlist = user.playlists.find((item) => item._id === playlistId);
    return new Response(200, {}, { playlist });
  }
  return new Response(
    404,
    {},
    { errors: ["The user you request does not exist. Not Found error."] }
  );
};

/**
 * This handler handles adding videos from user's playlist.
 * send POST Request at /api/user/playlists/:playlistId
 * body contains {video}
 * */

export const addVideoToPlaylistHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const playlistId = request.params.playlistId;
    const { video } = JSON.parse(request.requestBody);
    const playlist = user.playlists.find((item) => item._id === playlistId);
    if (playlist.videos.some((item) => item.id === video.id)) {
      return new Response(
        409,
        {},
        {
          errors: ["The video is already in your playlist"],
        }
      );
    }
    playlist.videos.push(video);
    return new Response(201, {}, { playlist });
  }
  return new Response(
    404,
    {},
    { errors: ["The user you request does not exist. Not Found error."] }
  );
};

/**
 * This handler handles removing videos from user's playlist.
 * send DELETE Request at /api/user/playlists/:playlistId/:videoId
 * */

export const removeVideoFromPlaylistHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const playlistId = request.params.playlistId;
    const videoId = request.params.videoId;
    let playlist = user.playlists.find((item) => item._id === playlistId);
    const filteredVideos = playlist.videos.filter(
      (item) => item._id !== videoId
    );
    playlist.videos = filteredVideos;
    return new Response(200, {}, { playlist });
  }
  return new Response(
    404,
    {},
    { errors: ["The user you request does not exist. Not Found error."] }
  );
};
