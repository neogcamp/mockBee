import {addItemToCartHandler, getCartItemsHandler, removeItemFromCartHandler} from './backend/controllers/CartController'
import { addItemToWishListHandler, getWishListItemsHandler, removeItemFromWishListHandler } from './backend/controllers/WishListController';
import { Server, Model, RestSerializer} from "miragejs"
import { products } from './backend/db/products';
import { loginHandler, signupHandler } from './backend/controllers/AuthController';

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    serializers: {
      application: RestSerializer
    },
    environment,
    models: {
      product: Model,
      wishList: Model,
      cart: Model,
      user: Model
    },
    
    seeds(server) {
    products.forEach(item => {
      server.create("product", item);
    })
    },

    routes() {
      this.namespace = "api"
      // auth routes
      this.post("/signup", signupHandler.bind(this))
      this.post("/login", loginHandler.bind(this))

      // products routes
      this.get("/products", (schema) => {
          return {products: this.db.products};
      });

      // cart routes
      this.get("/user/cart", getCartItemsHandler.bind(this)) 
      this.post("/user/cart", addItemToCartHandler.bind(this))
      this.delete("/user/cart", removeItemFromCartHandler.bind(this)) 

      // wishlist routes
      this.get("/user/wishlist", getWishListItemsHandler.bind(this)) 
      this.post("/user/wishlist", addItemToWishListHandler.bind(this))
      this.delete("/user/wishlist", removeItemFromWishListHandler.bind(this)) 
    },
    
    
  })
  return server
}