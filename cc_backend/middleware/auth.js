import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export default async function Auth(req, res, next) {
    try {
        
        const token = req.headers.authorization.split(" ")[1];

        //retrive the user details of the loged in user
        const decordToken = await jwt.verify(token, process.env.JWT_TOKEN);

        req.user = decordToken;

        //console.log(req.user)

        next();

    } catch (error) {
        res.status(401).send({err: "Authentication Faild..."})
    }
}

export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession: false
    }
    next()
}