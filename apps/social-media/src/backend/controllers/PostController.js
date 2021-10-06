import { Response } from "miragejs";

/**
 * All the routes related to post are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all posts in the db.
 * send GET Request at /api/posts
 * */

export const getAllpostsHandler = function () {
  return new Response(200, {}, { posts: this.db.posts });
};

/**
 * This handler gets post by postId in the db.
 * send GET Request at /api/posts/:postId
 * */

export const getPostHandler = function (schema, request) {
  const postId = request.params.postId;
  try {
    const post = this.db.posts.findBy({ _id: postId });
    return new Response(200, {}, { post });
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
 * This handler handles creating a post in the db.
 * send POST Request at /api/user/posts/:postId
 * */

export const createPostHandler = function (schema, request) {
    const postId = request.params.postId;
    try {
      const post = this.db.posts.findBy({ _id: postId });
      return new Response(200, {}, { post });
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
  