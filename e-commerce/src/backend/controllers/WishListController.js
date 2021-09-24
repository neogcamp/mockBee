import { Response} from "miragejs"
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Wishlist are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting items to user's wishlist.
 * send GET Request at /api/user/wishlist
 * */

export const getWishListItemsHandler = function(schema, request) {
  const user = requiresAuth.call(this, request);
    if(user){
      return {wishList: user.wishList}
    }
  }

/**
 * This handler handles adding items to user's wishlist.
 * send POST Request at /api/user/wishlist
 * body contains {product}
 * */

export const addItemToWishListHandler = function(schema, request) {
  const user = requiresAuth.call(this, request);
  
  if(user){
    const {product} = JSON.parse(request.requestBody);
    user.wishList.push(product);
    return new Response(201, {}, {wishList: user.wishList} );
  }
  return new Response(401, {},{ errors: [ 'The token is invalid. Unauthorized access error.'] });
}

/**
 * This handler handles removing items to user's wishlist.
 * send DELETE Request at /api/user/wishlist
 * body contains {product}
 * */

export const removeItemFromWishListHandler = function(schema, request) {
  const user = requiresAuth.call(this, request);
  
  if(user){
    const productId = request.params.productId;
    const filteredWishList = user.wishList.filter(item => item._id !== productId);
    this.db.users.update({wishList: filteredWishList});
    
    return new Response(201, {}, {wishList: filteredWishList} );
  }
  return new Response(401, {},{ errors: [ 'The token is invalid. Unauthorized access error.'] });
}