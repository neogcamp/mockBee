import { Response } from "miragejs";

/**
 * All the routes related to Coupons are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all coupons in the db.
 * send GET Request at /api/coupon
 * */

export const getAllCouponsHandler = function () {
  return new Response(200, {}, { coupons: this.db.coupons });
};
