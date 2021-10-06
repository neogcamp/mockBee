import { v4 as uuid } from 'uuid';

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [{
    "_id": uuid(),
    "firstName": "Adarsh",
    "lastName": "Balika",
    "username": "adarshbalika",
    "password": "adarshBalika123"
}, {
    "_id": uuid(),
    "firstName": "Dhruvi",
    "lastName": "Shah",
    "username": "dhruvishah",
    "password": "dhruviShah123"
}, {
    "_id": uuid(),
    "firstName": "Shubham",
    "lastName": "Soni",
    "username": "shubhamsoni",
    "password": "shubhamSoni123"
}]