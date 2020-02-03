import * as jwt from 'jsonwebtoken';

export const decodeToken = (value: string): {id: string, email: string} => jwt.decode(value.split('Bearer ')[1]);
