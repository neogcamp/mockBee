import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
const jwt = require("jsonwebtoken");

export const signupHandler = (schema, request) => {
  const { username, password, firstName, lastName } = JSON.parse(
    request.requestBody
  );
  const newUser = {
    cart: [],
    wishList: [],
    username,
    firstName,
    lastName,
    password,
    _id: uuid(),
  };
  const createdUser = schema.users.create(newUser);
  const encodedToken = jwt.sign(
    { username, password },
    process.env.REACT_APP_JWT_SECRET
  );
  return new Response(201, {}, { createdUser, encodedToken });
};

export const loginHandler = (schema, request) => {
  const { username, password } = JSON.parse(request.requestBody);
  const encodedToken = jwt.sign(
    { username, password },
    process.env.REACT_APP_JWT_SECRET
  );
  const foundUser = schema.users.findBy({ username: username });
  if (foundUser) {
    if (foundUser.password === password) {
      return new Response(201, {}, { foundUser, encodedToken });
    }
    return new Response(404, {
      errors: ["The username you entered is not Registered. Not Found error"],
    });
  }
  return new Response(401, {
    errors: [
      "The credentials you entered are incorrect. Unauthorized access error.",
    ],
  });
};
