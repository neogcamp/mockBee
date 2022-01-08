import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: bcrypt.hashSync("adarshBalika123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Dhruvi",
    lastName: "Shah",
    username: "dhruvishah",
    password: bcrypt.hashSync("dhruviShah123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Shubham",
    lastName: "Soni",
    username: "shubhamsoni",
    password: bcrypt.hashSync("shubhamSoni123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
