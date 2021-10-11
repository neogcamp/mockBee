import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to user are present here.
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
 * send POST Request at /api/users/bookmark/:postId/
 * */

 export const bookmarkPostHandler = function (schema, request) {
    const {postId} = request.params;
    const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The username you entered is not Registered. Not Found error"],
        }
      );
    }
    if(user.bookmarks.includes(postId)){
        return new Response(400, {}, { errors: ["Post already bookmarked"] });   
    }
    user.bookmarks.push(postId)
    this.db.users.update({_id: user._id}, {...user, updatedAt: new Date()})
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

/**
 * This handler handles adding a post to user's bookmarks in the db.
 * send POST Request at /api/users/remove-bookmark/:postId/
 * */

export const removePostFromBookmarkHandler = function (schema, request) {
  const {postId} = request.params;
  let user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The username you entered is not Registered. Not Found error"],
        }
      );
    }
    if(!user.bookmarks.includes(postId)){
        return new Response(400, {}, { errors: ["Post not bookmarked yet"] });      
    }
    const filteredBookmarks = user.bookmarks.filter(post => post !== postId)
    user = {...user, bookmarks: filteredBookmarks}
    this.db.users.update({_id: user._id}, {...user, updatedAt: new Date()})
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

/**
 * This handler handles follow action.
 * send POST Request at /api/users/follow/:followUserId/
 * */

export const followUserHandler = (schema, request) => {
  const {followUserId} = request.params;
  const user = requiresAuth.call(this, request);
  const followUser = this.db.users.findBy({ _id: followUserId });
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The username you entered is not Registered. Not Found error"],
        }
      );
    }
    if(!user.following.includes(followUser)){
        return new Response(400, {}, { errors: ["User Already followed"] });      
    }
    
    user.following.push(followUser);
    this.db.users.update({_id: user._id}, {...user, updatedAt: new Date()})
    followUser.followers.push(user);
    this.db.users.update({_id: followUser._id}, {...followUser, updatedAt: new Date()})
    return new Response(200, {}, { user, followUser });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
}






