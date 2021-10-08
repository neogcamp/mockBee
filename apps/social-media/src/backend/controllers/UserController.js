import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to user are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all users in the db.
 * send GET Request at /api/users
 * */

export const getAllUsersHandler = function () {
    return new Response(200, {}, { users: this.db.users });
};

/**
 * This handler handles get a user from userId in the db.
 * send GET Request at /api/users/:userId
 * */

 export const getUserHandler = function (schema, request) {
    const userId = request.params.userId;
  try {
    const user = this.db.users.findBy({ _id: userId });
    return new Response(200, {}, { user });
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
 * This handler handles adding a post to user's bookmarks in the db.
 * send POST Request at /api/users/bookmark/:userId/:postId/
 * */

 export const bookmarkPostHandler = function (schema, request) {
    const {userId, postId} = request.params;
  try {
    const user = this.db.users.findBy({ _id: userId });
    if(user.bookmarks.includes(postId)){
        return new Response(400, {}, { errors: ["Post already bookamarked"] });   
    }
    user.bookmarks.push(postId)
    this.db.users.update({_id: userId}, {...user, updatedAt: new Date()})
    return new Response(200, {}, { bookmarks: user.bookmarks });
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

export const removePostFromBookmarkHandler = function (schema, request) {
    const {userId, postId} = request.params;
  try {
    let user = this.db.users.findBy({ _id: userId });
    if(!user.bookmarks.includes(postId)){
        return new Response(400, {}, { errors: ["Post not bookmarked yet"] });      
    }
    const filteredBookmarks = user.bookmarks.filter(post => post._id === postId)

    this.db.users.update({_id: userId}, {...user, updatedAt: new Date()})
    return new Response(200, {}, { bookmarks: user.bookmarks });
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






