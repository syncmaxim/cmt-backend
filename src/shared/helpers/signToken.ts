import * as jwt from 'jsonwebtoken';

export const signToken = (value: {_id: string, email: string}): string => jwt.sign(value, process.env.SECRET_KEY);
