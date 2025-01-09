import express, { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import globalErrorHandler from './middleware/globalErrorHandler';
import passport from 'passport'
import passportConfig from './config/passport';
import authRouter from './auth/authRoute';

config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
passportConfig(passport);




app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to placementpilot Express Backend',
  });
});

  app.use('/api/v1/auth', authRouter);
  app.use(globalErrorHandler);

export { server, io };
