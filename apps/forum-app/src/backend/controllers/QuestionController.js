import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to questions are present here.
 * */

/**
 * This handler handles getting all questions in the db.
 * send GET Request at /api/questions
 * */

 export const getAllQuestionsHandler = function () {
    return new Response(200, {}, { posts: this.db.posts });
  };

/**
 * This handler gets question by questionId in the db.
 * send GET Request at /api/questions/:questionId
 * */

 export const getQuestionHandler = function (schema, request) {
    const questionId = request.params.questionId;
    try {
      const question = this.db.questions.findBy({ _id: questionId });
      return new Response(200, {}, { question });
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
  
  export const getAllUserPostsHandler = function (schema, request) {
    const username = request.params.username;
    try {
      const posts = this.db.posts.findBy({ username: username });
      console.log(posts);
      return new Response(200, {}, { posts });
    }catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
  }
  

