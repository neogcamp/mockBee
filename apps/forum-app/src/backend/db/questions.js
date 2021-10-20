import {
    v4 as uuid
} from "uuid";

/**
 * Questions can be added here.
 * You can add default Questions of your wish with different attributes
 * */

export const questions = [{
    _id: uuid(),
    user: {
        "_id": "1",
        "firstName": "Adarsh",
        "lastName": "Balika",
        "email": "adarshbalika@gmail.com",

    },
    questionText: "Why to use Server Side Rendering",
    votes: {
        voteCount: {
            upvotes: 0,
            downvotes: 0
        },
        votesBy: [],
    },
    comments: [{
        _id: uuid(),
        user: {
            "_id": "3",
            "firstName": "Shubham",
            "lastName": "Soni",
            "email": "shubhamsoni@gmail.com",
        },
        commentText: "Interesting"

    }, {
        _id: uuid(),
        user: {
            "_id": "2",
            "firstName": "Dhruvi",
            "lastName": "Shah",
            "email": "dhruvishah@gmail.com",
        },
        commentText: "Wow!"

    }],
    answers: [{
        _id: uuid(),
        userId: '2',
        answerText: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        votes: {
            voteCount: {
                upvotes: 0,
                downvotes: 0
            },
            votesBy: [],
        },
        comments: [{
            _id: uuid(),
            userId: "1",
            commentText: "Thanks for the answer!"

        }]
    }],
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString()
}, ];
