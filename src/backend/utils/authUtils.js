import { Response} from "miragejs";
const jwt = require('jsonwebtoken')

export const requiresAuth = function(request){   
    const encodedToken = request.requestHeaders.authorization;
    const decodedToken = jwt.verify(encodedToken, process.env.REACT_APP_JWT_SECRET);
    if(decodedToken){
        const user = this.db.users.findBy({username: decodedToken.username});
        return user
    }
    return new Response(401, { errors: [ 'The token is invalid. Unauthorized access error.'] });
}