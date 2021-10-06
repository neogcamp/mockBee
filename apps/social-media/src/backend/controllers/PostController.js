import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

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
 * send POST Request at /api/user/posts/
 * body contains {content}
 * */

export const createPostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { content } = JSON.parse(request.requestBody);
    const post = {
      _id: uuid(),
      content,
      likes: {
        likeCount: 0,
        likedBy: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.db.posts.insert(post);
    return new Response(201, {}, { posts: this.db.posts });
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
 * This handler handles deleting a post in the db.
 * send DELETE Request at /api/user/posts/:postId
 * */
export const deletePostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const postId = request.params.postId;
    this.db.posts.remove({_id: postId})
    return new Response(201, {}, { posts: this.db.posts});
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
