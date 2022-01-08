import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Wishlist are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting items to user's wishlist.
 * send GET Request at /api/user/wishlist
 * */

export const getWishListItemsHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const userWishList = schema.users.findBy({ _id: userId }).wishlist;
  return new Response(200, {}, { wishlist: userWishList });
};

/**
 * This handler handles adding items to user's wishlist.
 * send POST Request at /api/user/wishlist
 * body contains {product}
 * */

export const addItemToWishListHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const userWishList = schema.users.findBy({ _id: userId }).wishlist;
    const { product } = JSON.parse(request.requestBody);
    userWishList.push({
      ...product,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });
    this.db.users.update({ _id: userId }, { wishlist: userWishList });
    return new Response(201, {}, { wishlist: userWishList });
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
 * This handler handles removing items to user's wishlist.
 * send DELETE Request at /api/user/wishlist
 * body contains {product}
 * */

export const removeItemFromWishListHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    let userWishList = schema.users.findBy({ _id: userId }).wishlist;
    const productId = request.params.productId;
    userWishList = userWishList.filter((item) => item._id !== productId);
    this.db.users.update({ _id: userId }, { wishlist: userWishList });
    return new Response(200, {}, { wishlist: userWishList });
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
