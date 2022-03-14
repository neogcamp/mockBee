import { v4 as uuid } from "uuid";
import bcyrpt from "bcryptjs";
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
    password: bcyrpt.hashSync("adarshBalika123"),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Dhruvi",
    lastName: "Shah",
    username: "dhruvishah",
    password: bcyrpt.hashSync("dhruviShah123"),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Shubham",
    lastName: "Soni",
    username: "shubhamsoni",
    password: bcyrpt.hashSync("shubhamSoni123"),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
