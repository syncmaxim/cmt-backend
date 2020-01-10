import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import errorMessage from '../../shared/helpers/error-messages';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const authToken = request.headers.authorization.split('Bearer ')[1];
      try {
        jwt.verify(authToken, process.env.SECRET_KEY);
        return true;
      } catch (e) {
        throw new HttpException(errorMessage.token.INVALID_TOKEN, 403)
      }
    } else {
      throw new HttpException(errorMessage.token.NO_TOKEN, 403)
    }
  }
}
