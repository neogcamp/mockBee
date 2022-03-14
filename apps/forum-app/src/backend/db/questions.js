import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * Questions can be added here.
 * You can add default Questions of your wish with different attributes
 * */

export const questions = [
  {
    _id: uuid(),
    username: "adarshbalika",
    questionTitle: "Why to use Server Side Rendering",
    questionText: "I am Detailed Description about the Question.",
    votes: {
      upvotedBy: [],
      downvotedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        commentText: "Interesting",
      },
      {
        _id: uuid(),
        username: "sohamshah",
        commentText: "Wow!",
      },
    ],
    answers: [
      {
        _id: uuid(),
        username: "sohamshah",
        answerText:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        comments: [
          {
            _id: uuid(),
            username: "shubhamsoni",
            commentText: "Thanks for the answer!",
          },
        ],
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
