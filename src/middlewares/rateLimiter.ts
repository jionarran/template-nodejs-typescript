import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import config from 'config';

import AppError from '@src/errors/AppError';

const REDIS_URI = config.get<string>('App.jobs.redisUri');

const redisConnection = redis.createClient({
  url: REDIS_URI,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisConnection,
  keyPrefix: 'rateLimiter',
  points: 20,
  duration: 1,
});

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (error) {
    throw new AppError('Too many requests', 429);
  }
};
