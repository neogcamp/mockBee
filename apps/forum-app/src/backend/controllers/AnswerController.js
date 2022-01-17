import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to answers are present here.
 * */

/**
 * This handler handles getting all answers for a particular question in the db.
 * send GET Request at /api/answers/:questionId
 * */

export const getAllAnswersHandler = function (schema, request) {
  const questionId = request.params.questionId;
  try {
    const answers = schema.questions.findBy({ _id: questionId }).attrs.answers;
    return new Response(200, {}, { answers });
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
 * This handler handles adding an answer for a particular question in the db.
 * send POST Request at /api/answers/add/:questionId
 * body contains {answerData}
 * */

export const addAnswerHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  const questionId = request.params.questionId;
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
    const question = schema.questions.findBy({ _id: questionId }).attrs;
    const { answerData } = JSON.parse(request.requestBody);
    const answer = {
      _id: uuid(),
      votes: {
        upvotedBy: [],
        downvotedBy: [],
      },
      comments: [],
      ...answerData,
      username: user.username,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    };
    question.answers.push(answer);
    this.db.questions.update({ _id: questionId }, question);
    return new Response(201, {}, { answers: question.answers });
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
 * This handler edits an answer of a question in the db.
 * send POST Request at /api/answers/edit/:questionId/:answerId
 * body contains {answerData}
 * */

export const editAnswerHandler = function (schema, request) {
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
    const { answerData } = JSON.parse(request.requestBody);
    let question = schema.questions.findBy({ _id: questionId }).attrs;
    const answerIndex = question.answers.findIndex(
      (answer) => answer._id === answerId
    );
    if (question.answers[answerIndex].username !== user.username) {
      return new Response(
        400,
        {},
        { errors: ["Cannot edit an Answer that doesn't belong to the User."] }
      );
    }

    question.answers[answerIndex] = {
      ...question.answers[answerIndex],
      ...answerData,
      updatedAt: formatDate(),
    };
    this.db.questions.update({ _id: questionId }, question);
    return new Response(201, {}, { answers: question.answers });
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
 * This handler handles deleting an answer for a particular question in the db.
 * send DELETE Request at /api/answers/delete/:questionId/:answerId
 * */

export const deleteAnswerHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  const { questionId, answerId } = request.params;
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
    const question = schema.questions.findBy({ _id: questionId }).attrs;
    const answerIndex = question.answers.findIndex(
      (answer) => answer._id === answerId
    );
    if (
      question.answers[answerIndex].username !== user.username &&
      question.username !== user.username
    ) {
      return new Response(
        400,
        {},
        { errors: ["Cannot delete an Answer doesn't belong to the User."] }
      );
    }
    question.answers.splice(answerIndex, 1);
    this.db.questions.update({ _id: questionId }, question);
    return new Response(201, {}, { answers: question.answers });
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
