import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to votes are present here.
 * */

/**
 * This handler handles getting all votes for a particular question in the db.
 * send GET Request at /api/votes/:questionId
 * */

export const getQuestionVotesHandler = function (schema, request) {
  const questionId = request.params.questionId;
  try {
    const question = this.db.questions.findBy({ _id: questionId });
    return new Response(200, {}, { votes: question.votes });
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
 * This handler handles getting all votes for a particular answer in the db.
 * send GET Request at /api/votes/:questionId/:answerId
 * */

export const getAnswerVotesHandler = function (schema, request) {
  const { questionId, answerId } = request.params;
  try {
    const question = this.db.questions.findBy({ _id: questionId });
    const { votes } = question.answers.find(
      (answer) => answer._id === answerId
    );
    return new Response(200, {}, { votes });
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
 * This handler handles reacting to a particular question in the db.
 * send POST Request at /api/votes/react/:questionId
 * */

export const voteQuestionHandler = function (schema, request) {
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
    const question = this.db.questions.findBy({ _id: questionId });
    const vote = JSON.parse(request.requestBody);
    switch (vote.reaction) {
      case "upvote":
        question.votes.upvotedBy = question.votes.upvotedBy.filter(
          (username) => username !== user.username
        );
        question.votes.downvotedBy = question.votes.downvotedBy.filter(
          (username) => username !== user.username
        );
        question.votes.upvotedBy.push(user.username);
        break;
      case "unvote":
        question.votes.upvotedBy = question.votes.upvotedBy.filter(
          (username) => username !== user.username
        );
        question.votes.downvotedBy = question.votes.downvotedBy.filter(
          (username) => username !== user.username
        );
        break;
      case "downvote":
        question.votes.upvotedBy = question.votes.upvotedBy.filter(
          (username) => username !== user.username
        );
        question.votes.downvotedBy = question.votes.downvotedBy.filter(
          (username) => username !== user.username
        );
        question.votes.downvotedBy.push(user.username);
        break;
      default:
        return new Response(
          400,
          {},
          {
            errors: [
              "Invalid Reaction. Please Try with a valid Reaction again.",
            ],
          }
        );
    }
    return new Response(201, {}, { questions: this.db.questions });
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
 * This handler handles reacting to a particular question in the db.
 * send POST Request at /api/votes/react/:questionId
 * */

export const voteAnswerHandler = function (schema, request) {
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
    const question = this.db.questions.findBy({ _id: questionId });
    const answer = question.answers.find((answer) => answer._id === answerId);
    const vote = JSON.parse(request.requestBody);
    switch (vote.reaction) {
      case "upvote":
        answer.votes.upvotedBy = answer.votes.upvotedBy.filter(
          (username) => username !== user.username
        );
        answer.votes.downvotedBy = answer.votes.downvotedBy.filter(
          (username) => username !== user.username
        );
        answer.votes.upvotedBy.push(user.username);
        break;
      case "unvote":
        answer.votes.upvotedBy = answer.votes.upvotedBy.filter(
          (username) => username !== user.username
        );
        answer.votes.downvotedBy = answer.votes.downvotedBy.filter(
          (username) => username !== user.username
        );
        break;
      case "downvote":
        answer.votes.upvotedBy = answer.votes.upvotedBy.filter(
          (username) => username !== user.username
        );
        answer.votes.downvotedBy = answer.votes.downvotedBy.filter(
          (username) => username !== user.username
        );
        answer.votes.downvotedBy.push(user.username);
        break;
      default:
        return new Response(
          400,
          {},
          {
            errors: [
              "Invalid Reaction. Please Try with a valid Reaction again.",
            ],
          }
        );
    }
    return new Response(201, {}, { questions: this.db.questions });
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
