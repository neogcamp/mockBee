// THIS FILE IS JUST FOR TESTING PURPOSES. Will be deleted once while publishing it.

import React, { useState, useEffect } from "react";
import axios from 'axios'
export default function App() {
  let [token, setToken] = useState("");
  let [users, setUsers] = useState([]);
  let [questions, setQuestions] = useState([]);
  const encodedToken = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      await handleFetchUsers();
      await handleFetchQuestions();
    })();
  }, []);


  const handleFetchQuestion = async (questionId) => {
    try {
      const response = await axios.get(
        `/api/questions/${questionId}`,
      );
      console.log(response.data.question);
    } catch (error) {
      console.log(error);
    }
  }
  const handleFetchAllUserQuestions = async (username) => {
    try {
      const response = await axios.get(
        `/api/user/questions/${username}`,
      );
      console.log(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  }
  const handleEditUser = async (userData) => {
    try {
      const response = await axios.post(
        `/api/users/edit`,
        {userData},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddQuestion = async (questionData) => {
    try {
      const response = await axios.post(
        `/api/questions/add`,
        {questionData},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  }
  const handleVoteQuestion = async (vote, questionId) => {
    try {
      const response = await axios.post(
        `/api/votes/vote/${questionId}`,
        vote,
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  }
  const handleVoteAnswer = async (vote, questionId, answerId) => {
    try {
      const response = await axios.post(
        `/api/votes/vote/${questionId}/${answerId}`,
        vote,
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  }
  const handleAddAnswer = async (answerData, questionId) => {
    try {
      const response = await axios.post(
        `/api/answers/add/${questionId}`,
        {answerData},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  }
  const handleEditQuestion = async (questionData, questionId) => {
    try {
      const response = await axios.post(
        `/api/questions/edit/${questionId}`,
        {questionData},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  }
  const handleEditAnswer = async (answerData, answerId, questionId) => {
    try {
      const response = await axios.post(
        `/api/answers/edit/${questionId}/${answerId}`,
        {answerData},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await axios.delete(
        `/api/questions/delete/${questionId}`,
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteAnswer = async (answerId, questionId) => {
    try {
      const response = await axios.delete(
        `/api/answers/delete/${questionId}/${answerId}`,
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFetchUsers = async () => {
    try {
      const response = await axios.get(`/api/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  // signup API call
  const signupHandler = async () => {
    try {
      const response = await axios.post(
        `/api/auth/signup`, {firstName: "Soham",
        lastName: "Shah",
        username: "sohamsshah",
        password: "123"}
      );
      localStorage.setItem("token", response.data.encodedToken);
        setToken(response.data.encodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  // login API call
  const loginHandler = async () => {
    try {
      const response = await axios.post(
        `/api/auth/login`, {
        username: "sohamsshah",
        password: "123"}
      );
      localStorage.setItem("token", response.data.encodedToken);
        setToken(response.data.encodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchQuestions = async () => {
    try {
      const response = await axios.get(`/api/questions`);
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <h2>Available Products</h2>
      <button onClick={() => signupHandler()}> Signup</button>
      <button onClick={() => loginHandler()}> Login</button>
      <button onClick={() => handleEditUser({ firstName: "sodium", lastName:"lol" })}>Edit details</button>
      <button onClick={() => questions && handleFetchQuestion(questions[0]._id)}>Handle Fetch Question</button>
      <button onClick={() => questions && handleFetchAllUserQuestions(questions[0].username)}>Get all User Questions</button>
      <button onClick={() => handleAddQuestion({questionTitle:"Hello World", questionText:"Haha nice one!"})}>Ask Question</button>
      
      <div>
        <h2> Questions</h2>
        <ul>
          {questions && questions.map(question => <li>
            <h4>{question.username}</h4>
            <h3>{question.questionTitle}</h3>
            <p>{question.questionText}</p>
            <button onClick={() => handleEditQuestion({questionTitle: "Cool Cool Cool", questionText: "Lol new content"}, question._id)}>Edit Question</button>
            <button onClick={() => handleDeleteQuestion(question._id)}>Delete Question</button>
            <button onClick={() => handleAddAnswer({answerText: "My Answer"},question._id)}>Add Answer</button>
            <button onClick={() => handleVoteQuestion({reaction: "upvote"},question._id)}>Upvote</button> 
            <button onClick={() => handleVoteQuestion({reaction: "downvote"},question._id)}>Downvote</button> 
            <button onClick={() => handleVoteQuestion({reaction: "unvote"},question._id)}>Unvote</button> 
           
            <div>
            Upvotes: {question.votes.upvotedBy.length}
            Downvotes: {question.votes.downvotedBy.length}
            </div>
            
            {question.answers && question.answers.map(answer => 
              <div>
                <h4>{answer.username}</h4>
                <p>{answer.answerText}</p>
                <button onClick={() => handleEditAnswer({answerText: "WOWWWWWWW I am short"}, answer._id,question._id)}>Edit</button>
              <button onClick={() => handleDeleteAnswer(answer._id,question._id)}>Delete</button>
            <button onClick={() => handleVoteAnswer({reaction: "upvote"},question._id, answer._id)}>Upvote Answer</button> 
            <button onClick={() => handleVoteAnswer({reaction: "downvote"},question._id, answer._id)}>Downvote Answer</button> 
            <button onClick={() => handleVoteAnswer({reaction: "unvote"},question._id, answer._id)}>Unvote Answer</button> 
            
              Upvotes: {answer.votes.upvotedBy.length}
              Downvotes: {answer.votes.downvotedBy.length}

              </div>
            )}
          </li>)}
        </ul>
      </div>
    </div>
  );
}
