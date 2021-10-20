import {
    loginHandler,
    signupHandler,
  } from "./backend/controllers/AuthController";
import { getAllUsersHandler, getUserHandler, editUserHandler } from "./backend/controllers/UserController";
import { Server, Model, RestSerializer } from "miragejs";
import { users } from "./backend/db/users";
import { questions } from "./backend/db/questions";
import { getAllQuestionsHandler } from "./backend/controllers/QuestionController";
export function makeServer({ environment = "development" } = {}) {
    let server = new Server({
      serializers: {
        application: RestSerializer,
      },
      environment,
      models: {
        user: Model,
        question: Model
      },
  
      // Runs on the start of the server
      seeds(server) {
        users.forEach((item) =>
        server.create("user", { ...item})
      );

        questions.forEach(item => {
          server.create("question", {...item});
        });
      },
  
      routes() {
        this.namespace = "api";
        // auth routes (public)
        this.post("/auth/signup", signupHandler.bind(this));
        this.post("/auth/login", loginHandler.bind(this));

        // user routes (public)
        this.get("/users", getAllUsersHandler.bind(this));
        this.get("/users/:userId", getUserHandler.bind(this));

       // user routes (private)
       this.post("users/edit", editUserHandler.bind(this))

       // questions routes (public)
       this.get("/questions", getAllQuestionsHandler.bind(this));
       this.get("/questions/:questionId", getQuestionHandler.bind(this));
       this.get("/questions/:userId", getUserQuestionsHandler.bind(this));

       // questions routes (private)
       this.post("/questions/add", addQuestionHandler.bind(this));
       this.delete("questions/delete/:questionId", deleteQuestionHandler.bind(this));
       
       // answers routes (public)
       this.get("/answers/:questionId", getAllAnswersHandler.bind(this));

       // answers routes (private)
       this.post("/answers/add/:questionId", addAnswerHandler.bind(this));
       this.post("/answers/delete/:questionId/:answerId", deleteAnswerHandler.bind(this));

       // votes routes (public)
       this.get("/votes/:questionId", getQuestionVotesHandler.bind(this));
       this.get("/votes/:questionId/:answerId", getAnswerVotesHandler.bind(this));

       // votes routes (private)
       this.post("/votes/upvote/:questionId", upvoteQuestionHandler.bind(this));
       this.post("/votes/downvote/:questionId", downvoteQuestionHandler.bind(this));
       this.post("/votes/unvote/:questionId", unvoteQuestionHandler.bind(this));
       this.post("/votes/upvote/:questionId/:answerId", upvoteAnswerHandler.bind(this));
       this.post("/votes/downvote/:questionId/:answerId", downvoteAnswerHandler.bind(this));
       this.post("/votes/unvote/:questionId/:answerId", unvoteAnswerHandler.bind(this));
       
       // comments routes (public)
       this.get("/comments/:questionId", getQuestionCommentsHandler.bind(this));
       this.get("/comments/:questionId/:answerId", getAnswerCommentsHandler.bind(this));
       
       // comments routes (private)
       this.post("/comments/add/:questionId", addQuestionCommentHandler.bind(this));
       this.post("/comments/delete/:questionId", deleteQuestionCommentHandler.bind(this));
       this.post("/comments/add/:questionId/:answerId", addAnswerCommentHandler.bind(this));
       this.post("/comments/delete/:questionId", deleteAnswerCommentHandler.bind(this));
      
    },
    });
    return server;
  }
  