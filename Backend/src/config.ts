import { error } from "console";
import dotenv from "dotenv";
dotenv.config();

function check(name : string):string{
    const value = process.env[name];
    if(!value){
        throw new Error(`Missing env variables : ${name}`);
    }
    return  value;
}

export const JWT_SECRET = check('JWT_SECRET');
export const MONGODB_URI = check('MONGODB_URI');
export const PORT = parseInt(check('PORT'), 10);
