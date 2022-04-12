import { v4 as uuid } from "uuid";

/**
 * Coupons Database can be added here.
 * You can add different coupons of your wish with different attributes
 * */

export const coupons = [
  {
    _id: uuid(),
    couponDescription: "50% off",
    coupon: 50,
    couponCode: "SHOP50",
  },
  {
    _id: uuid(),
    couponDescription: "30% off",
    coupon: 30,
    couponCode: "SHOP30",
  },
];
