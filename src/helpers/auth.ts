import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcryptjs';

interface DecodedToken {
  user: DecodedUser;
  iat: number;
  exp: number;
}

interface DecodedUser {
  id: string;
  email: string;
  name: string;
  lastLogin: string;
}

export default class AuthHelper {
  public static generateToken(payload: object): string {
    const secret: string = config.get('App.auth.secretApp');
    const expiresIn: string = config.get('App.auth.expiresIn');
    return jwt.sign(payload, secret, { expiresIn });
  }

  public static decodeToken(token: string): DecodedToken {
    return jwt.verify(token, config.get('App.auth.secretApp')) as DecodedToken;
  }

  public static comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
