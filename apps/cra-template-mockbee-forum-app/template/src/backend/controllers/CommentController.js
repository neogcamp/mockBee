import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to comments are present here.
 * */

/**
 * This handler handles getting all comments for a particular question in the db.
 * send GET Request at /api/comments/:questionId
 * */

export const getQuestionCommentsHandler = function (schema, request) {
  const { questionId } = request.params;
  try {
    const question = schema.questions.findBy({ _id: questionId }).attrs;
    return new Response(200, {}, { comments: question.comments });
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
 * This handler handles getting all comments for a particular answer in the db.
 * send GET Request at /api/comments/:questionId/:answerId
 * */

export const getAnswerCommentsHandler = function (schema, request) {
  const { questionId, answerId } = request.params;
  try {
    const question = schema.questions.findBy({ _id: questionId }).attrs;
    const { comments } = question.answers.find(
      (answer) => answer._id === answerId
    );
    return new Response(200, {}, { comments });
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
 * This handler handles adding a comment to a particular question in the db.
 * send POST Request at /api/comments/add/:questionId
 * */

export const addQuestionCommentHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const { questionId } = request.params;
    const { commentData } = JSON.parse(request.requestBody);

    const comment = {
      _id: uuid(),
      ...commentData,
      username: user.username,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    };
    const question = schema.questions.findBy({ _id: questionId }).attrs;
    question.comments.push(comment);
    this.db.questions.update({ _id: questionId }, question);
    return new Response(201, {}, { comments: question.comments });
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
 * This handler handles editing a comment to a particular question in the db.
 * send POST Request at /api/comments/edit/:questionId/:commentId
 * */

export const editQuestionCommentHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const { questionId, commentId } = request.params;
    const { commentData } = JSON.parse(request.requestBody);
    const question = schema.questions.findBy({ _id: questionId }).attrs;
    const commentIndex = question.comments.findIndex(
      (comment) => comment._id === commentId
    );
    if (question.comments[commentIndex].username !== user.username) {
      return new Response(
        400,
        {},
        { errors: ["Cannot edit a comment doesn't belong to the User."] }
      );
    }
    question.comments[commentIndex] = {
      ...question.comments[commentIndex],
      ...commentData,
      updatedAt: formatDate(),
    };
    this.db.questions.update({ _id: questionId }, question);
    return new Response(201, {}, { comments: question.comments });
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
 * This handler handles deleting a comment to a particular question in the db.
 * send DELETE Request at /api/comments/delete/:questionId/:commentId
 * */

export const deleteQuestionCommentHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const { questionId, commentId } = request.params;
    const question = schema.questions.findBy({ _id: questionId }).attrs;
    const commentIndex = question.comments.findIndex(
      (comment) => comment._id === commentId
    );
    if (
      question.comments[commentIndex].username !== user.username &&
      question.username !== user.username
    ) {
      return new Response(
        400,
        {},
        { errors: ["Cannot delete a comment doesn't belong to the User."] }
      );
    }
    question.comments = question.comments.filter(
      (comment) => comment._id !== commentId
    );
    this.db.questions.update({ _id: questionId }, question);
    return new Response(201, {}, { comments: question.comments });
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
 * This handler handles adding a comment to a particular answer in the db.
 * send POST Request at /api/comments/add/:questionId/:answerId
 * */

export const addAnswerCommentHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const { questionId, answerId } = request.params;
    const { commentData } = JSON.parse(request.requestBody);
    const comment = {
      _id: uuid(),
      ...commentData,
      username: user.username,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    };
    const question = schema.questions.findBy({ _id: questionId }).attrs;
    const answer = question.answers.find((answer) => answer._id === answerId);
    answer.comments.push(comment);
    this.db.questions.update({ _id: questionId }, question);
    return new Response(201, {}, { comments: answer.comments });
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
 * This handler handles editing a comment to a particular answer in the db.
 * send POST Request at /api/comments/edit/:questionId/:answerId/:commentId
 * */

export const editAnswerCommentHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const { questionId, answerId, commentId } = request.params;
    const { commentData } = JSON.parse(request.requestBody);
    const question = schema.questions.findBy({ _id: questionId }).attrs;
    const answer = question.answers.find((answer) => answer._id === answerId);
    const commentIndex = answer.comments.findIndex(
      (comment) => comment._id === commentId
    );
    if (answer.comments[commentIndex].username !== user.username) {
      return new Response(
        400,
        {},
        { errors: ["Cannot edit a comment doesn't belong to the User."] }
      );
    }
    answer.comments[commentIndex] = {
      ...answer.comments[commentIndex],
      ...commentData,
      updatedAt: formatDate(),
    };
    this.db.questions.update({ _id: questionId }, question);
    return new Response(201, {}, { comments: answer.comments });
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
 * This handler handles deleting a comment to a particular question in the db.
 * send DELETE Request at /api/comments/delete/:questionId/:answerId/:commentId
 * */

export const deleteAnswerCommentHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const { questionId, answerId, commentId } = request.params;
    const question = schema.questions.findBy({ _id: questionId }).attrs;
    const answer = question.answers.find((answer) => answer._id === answerId);
    const commentIndex = answer.comments.findIndex(
      (comment) => comment._id === commentId
    );
    if (
      answer.comments[commentIndex].username !== user.username &&
      answer.username !== user.username
    ) {
      return new Response(
        400,
        {},
        { errors: ["Cannot delete a comment doesn't belong to the User."] }
      );
    }
    answer.comments = answer.comments.filter(
      (comment) => comment._id !== commentId
    );
    this.db.questions.update({ _id: questionId }, question);
    return new Response(201, {}, { comments: answer.comments });
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
