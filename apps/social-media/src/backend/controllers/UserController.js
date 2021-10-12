import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

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
    const post = this.db.posts.findBy({_id: postId});
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
    const isBookmarked = user.bookmarks.find(currPost => currPost._id === postId);
    if(isBookmarked){
        return new Response(400, {}, { errors: ["Post already bookmarked"] });   
    }
    user.bookmarks.push(post)
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
  const post = this.db.posts.findBy({_id: postId});
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
    const isBookmarked = user.bookmarks.find(currPost => currPost._id === postId);
    if(!isBookmarked){
        return new Response(400, {}, { errors: ["Post not bookmarked yet"] });      
    }
    const filteredBookmarks = user.bookmarks.filter(currPost => currPost._id !== postId)
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

export const followUserHandler = function(schema, request) {
  const user = requiresAuth.call(this, request);
  const {followUserId} = request.params;
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
    const isFollowing = user.following.find(currUser => currUser._id === followUser._id);
    
    if(isFollowing){
      return new Response(400, {}, { errors: ["User Already following"] });  
    }
    
    const updatedUser = {...user, following: [...user.following, {...followUser}]} 
    const updatedFollowUser = {...followUser, followers: [...followUser.followers, {...user}]}
    this.db.users.update({_id: user._id}, {...updatedUser, updatedAt: new Date()}) 
    this.db.users.update({_id: followUser._id}, {...updatedFollowUser, updatedAt: new Date()})
    return new Response(200, {}, { user:updatedUser, followUser: updatedFollowUser });
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

/**
 * This handler handles unfollow action.
 * send POST Request at /api/users/unfollow/:followUserId/
 * */

 export const unfollowUserHandler = function(schema, request) {
  const user = requiresAuth.call(this, request);
  const {followUserId} = request.params;
  const followUser = this.db.users.findBy({ _id: followUserId });
  console.log(user, followUser);
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
    const isFollowing = user.following.find(currUser => currUser._id === followUser._id);
    
    if(!isFollowing){
      return new Response(400, {}, { errors: ["User already not following"] });  
    }
    
    const updatedUser = {...user, following: user.following.filter(currUser => currUser._id !== followUser._id)} 
    const updatedFollowUser = {...followUser, followers: followUser.followers.filter(currUser => currUser._id !== user._id)}
    this.db.users.update({_id: user._id}, {...updatedUser, updatedAt: new Date()}) 
    this.db.users.update({_id: followUser._id}, {...updatedFollowUser, updatedAt: new Date()})
    return new Response(200, {}, { user:updatedUser, followUser:updatedFollowUser });
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





