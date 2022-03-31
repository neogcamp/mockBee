import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Habits are present here.
 * These are Privately accessible routes.
 * */

/**
 * This handler handles getting user habits.
 * send GET Request at /api/habits
 * */

export const getHabitsHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  return new Response(200, {}, { habits: user.habits });
};

/**
 * This handler handles getting user habit.
 * send GET Request at /api/habits/:habitId
 * */

export const getHabitHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const habitId = request.params.habitId;
  const habit = user.habits.find((habit) => habit._id === habitId);
  return new Response(200, {}, { habit });
};

/**
 * This handler handles creating a user habit.
 * send POST Request at /api/habits
 * body contains {habit}
 * */

export const createHabitHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { habit } = JSON.parse(request.requestBody);
  const createdHabit = {
    _id: uuid(),
    labels: [],
    ...habit,
  };
  user.habits.push(createdHabit);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { habits: user.habits });
};

/**
 * This handler handles editing user habits.
 * send POST Request at /api/habits/:habitId
 * body contains {habit}
 * */

export const editHabitHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { habit } = JSON.parse(request.requestBody);
  const habitId = request.params.habitId;
  const habitIndex = user.habits.findIndex((habit) => habit._id === habitId);
  user.habits[habitIndex] = { ...user.habits[habitIndex], ...habit };
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { habits: user.habits });
};

/**
 * This handler handles deleting user habits.
 * send DELETE Request at /api/habits/:habitId
 * */

export const deleteHabitHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const habitId = request.params.habitId;
  user.habits = user.habits.filter((habit) => habit._id !== habitId);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { habits: user.habits });
};
