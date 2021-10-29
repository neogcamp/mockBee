import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to questions are present here.
 * */

/**
 * This handler handles getting all questions in the db.
 * send GET Request at /api/questions
 * */

 export const getAllQuestionsHandler = function () {
    return new Response(200, {}, { questions: this.db.questions });
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

  /**
 * This handler gets all questions by username in the db.
 * send GET Request at /api/user/questions/:username
 * */
  
  export const getAllUserQuestionsHandler = function (schema, request) {
    const username = request.params.username;
    try {
      const questions = this.db.questions.findBy({ username: username });
      return new Response(200, {}, { questions });
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

  /**
 * This handler adds a new question in the db.
 * send POST Request at /api/questions/add
 * */

  export const addQuestionHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
      if (!user) {
        return new Response(
          404,
          {},
          {
            errors: ["The username you entered is not Registered. Not Found error"],
          }
        );
      }
      const { questionData } = JSON.parse(request.requestBody);
      const question = {
        _id: uuid(),
        votes: {
          voteCount: {
              upvotes: 0,
              downvotes: 0
          },
          votesBy: [],
        },
        comments:[],
        answers:[],
        ...questionData,
        username: user.username,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
      };
      this.db.questions.insert(question);
      return new Response(201, {}, { questions: this.db.questions });
      
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

  /**
 * This handler edits a question in the db.
 * send POST Request at /api/questions/edit/:questionId
 * */

  export const editQuestionHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
      try {
      if (!user) {
        return new Response(
          404,
          {},
          {
            errors: ["The username you entered is not Registered. Not Found error"],
          }
        );
      }
      const questionId = request.params.questionId;
      const { questionData } = JSON.parse(request.requestBody);
      let question = this.db.questions.findBy({_id: questionId})
      if(question.username !== user.username){
        return new Response(400, {},  { errors: ["Cannot delete a Question doesn't belong to the User."]}); 
      }
      question = {...question, ...questionData}
      this.db.questions.update({_id: questionId}, question)
      return new Response(201, {}, { questions: this.db.questions});
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
 * This handler deletes a question in the db.
 * send DELETE Request at /api/questions/delete/:questionId
 * */

  export const deleteQuestionHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    console.log(user.username);
    try {
      if (!user) {
        return new Response(
          404,
          {},
          {
            errors: ["The username you entered is not Registered. Not Found error"],
          }
        );
      }
      const questionId = request.params.questionId;
      const question = this.db.questions.findBy({_id: questionId})
      console.log(question);
      if(question.username !== user.username){
        return new Response(400, {},  { errors: ["Cannot delete a Question doesn't belong to the User."]}); 
      }
      this.db.questions.remove({_id: questionId})
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



    
  

