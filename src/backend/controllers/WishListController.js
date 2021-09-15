import { Response} from "miragejs"
import { requiresAuth } from "../utils/authUtils";

export const getWishListItemsHandler = function(schema, request) {
  const user = requiresAuth.call(this, request);
    if(user){
      return {wishList: user.wishList}
    }
  }

  export const addItemToWishListHandler = function(schema, request) {
    const user = requiresAuth.call(this, request);
    
    if(user){
      const {product} = JSON.parse(request.requestBody);
      user.wishList.push(product);
      return new Response(201, {}, {wishList: user.wishList} );
    }
    return new Response(401, { errors: [ 'The token is invalid. Unauthorized access error.'] });
  }

  export const removeItemFromWishListHandler = function(schema, request) {
    const user = requiresAuth.call(this, request);
    
    if(user){
      const {product} = JSON.parse(request.requestBody);
      const filteredWishList = user.wishList.filter(item => item._id !== product._id);
      this.db.users.update({wishList: filteredWishList});
      
      return new Response(201, {}, {wishList: filteredWishList} );
    }
    return new Response(401, { errors: [ 'The token is invalid. Unauthorized access error.'] });
  }