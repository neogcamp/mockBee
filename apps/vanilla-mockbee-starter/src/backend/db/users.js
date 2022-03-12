import { v4 as uuid } from "uuid";
import bcyrpt from "bcryptjs";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@gmail.com",
    password: bcyrpt.hashSync("adarshBalika123", 5),
  },
  {
    _id: uuid(),
    firstName: "Soham",
    lastName: "Shah",
    email: "sohamshah@gmail.com",
    password: bcyrpt.hashSync("sohamShah123", 5),
  },
  {
    _id: uuid(),
    firstName: "Shubham",
    lastName: "Soni",
    email: "shubhamsoni@gmail.com",
    password: bcyrpt.hashSync("shubhamSoni123", 5),
  },
];
