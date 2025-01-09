import jwt from 'jsonwebtoken';
import {config} from 'dotenv';

config();

export const generateTokens = (userId: String) => {
  const accessToken = jwt.sign({ sub: userId }, process.env.ACCESS_JWT_SECRET as string, { expiresIn: '15min' });
  const refreshToken = jwt.sign({ sub: userId }, process.env.REFRESH_JWT_SECRET as string, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};
