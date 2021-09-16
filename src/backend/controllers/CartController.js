import { Response} from "miragejs"
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Cart are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting items to user's cart.
 * send GET Request at /api/user/cart
 * */
export const getCartItemsHandler = function(schema, request) {
    const user = requiresAuth.call(this, request);
    if(user){
      return {cart: user.cart}
    }
  }

/**
 * This handler handles adding items to user's cart.
 * send POST Request at /api/user/cart
 * body contains {product}
 * */

export const addItemToCartHandler = function(schema, request) {
  const user = requiresAuth.call(this, request);
  if(user){
    const {product} = JSON.parse(request.requestBody);
    user.cart.push({...product, qty: 1});
    return new Response(201, {}, {cart: user.cart} );
  }
  return new Response(401, { errors: [ 'The token is invalid. Unauthorized access error.'] });
}

/**
 * This handler handles removing items to user's cart.
 * send DELETE Request at /api/user/cart
 * body contains {product}
 * */

export const removeItemFromCartHandler = function(schema, request) {
  const user = requiresAuth.call(this, request);
  if(user){
    const {product} = JSON.parse(request.requestBody);
    const filteredCart = user.cart.filter(item => item._id !== product._id);
    this.db.users.update({cart: filteredCart});
    return new Response(201, {}, {cart: filteredCart} );
  }
  return new Response(404, { errors: [ 'The user you request does not exist. Not Found error.'] });
}

/**
 * This handler handles adding items to user's cart.
 * send POST Request at /api/user/cart/:productId
 * body contains {action} (can be increment or decrement)
 * */

export const updateCartItemHandler = function(schema, request) {
  const productId = request.params.productId;
  const user = requiresAuth.call(this, request);
  if(user){
    const {action} = JSON.parse(request.requestBody);
    if(action.type === "increment"){
        user.cart.forEach(product => {
            if(product._id === productId){
                product.qty+=1
            }
        })
    }else if(action.type === "decrement"){
      user.cart.forEach(product => {
          if(product._id === productId){
              product.qty-=1
          }
      })
    }
    return new Response(201, {}, {cart: user.cart} );
  }
  return new Response(401, { errors: [ 'The token is invalid. Unauthorized access error.'] });
}