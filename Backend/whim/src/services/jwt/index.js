import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
const jwtLifeTime = process.env.JWT_LIFETIME;
const jwtAlgorithm = process.env.JWT_ALGORITHM;

export const JwtService = {
    sign: (user) => jwt.sign({sub: user.id}, secret, {
                            algorithm: jwtAlgorithm,
                            lifetime: jwtLifetime
                        }),
    verify: (token) => jwt.verify(token, secret)
}