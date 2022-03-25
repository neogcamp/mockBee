import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Archives are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all archived habits in the db.
 * send GET Request at /api/archives
 * */

export const getAllArchivedHabitsHandler = function (schema, request) {
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
  return new Response(200, {}, { archives: user.archives });
};

/**
 * This handler handles delete an archived task in the db.
 * send DELETE Request at /api/archives/:habitId
 * */

export const deleteFromArchivesHandler = function (schema, request) {
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
  const { habitId } = request.params;
  user.archives = user.archives.filter((habit) => habit._id !== habitId);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { archives: user.archives });
};

/**
 * This handler handles restoring the archived habits.
 * send POST Request at /api/archives/restore/:habitId
 * */

export const restoreFromArchivesHandler = function (schema, request) {
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
  const { habitId } = request.params;
  const restoredHabit = user.archives.filter(
    (habit) => habit._id === habitId
  )[0];
  user.archives = user.archives.filter((habit) => habit._id !== habitId);
  user.habits.push(restoredHabit);
  this.db.users.update({ _id: user._id }, user);
  return new Response(
    200,
    {},
    { archives: user.archives, habits: user.habits }
  );
};

/**
 * This handler handles archiving a task
 * send POST Request at /api/archives/:habitId
 * */

export const archiveHabitHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { habitId } = request.params;
    const archivedHabit = user.habits.filter(
      (habit) => habit._id === habitId
    )[0];
    user.habits = user.habits.filter((habit) => habit._id !== habitId);
    user.archives.push({ ...archivedHabit });
    this.db.users.update({ _id: user._id }, user);
    return new Response(
      201,
      {},
      { archives: user.archives, habits: user.habits }
    );
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
