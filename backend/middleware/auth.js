import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});

const baseURL = process.env.ISSUER_URL;
const apiAudience = process.env.API_URL;
console.log(baseURL);

export const jwtCheck = auth({
    audience: apiAudience,
    issuerBaseURL: baseURL,
    tokenSigningAlg: 'RS256'
});