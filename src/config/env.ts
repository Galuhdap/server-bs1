import dotenv from 'dotenv';

dotenv.config();

export const jwtaccesToken = process.env.ACCES_TOKEN
export const jwtrefreshToken = process.env.REFRESH_TOKEN
export const jwtAccestokenExp = process.env.JWT_ACCESTOKEN_EXPIRATION
export const jwtRefreshtokenExp = process.env.JWT_REFRESHTOKEN_EXPIRATION

