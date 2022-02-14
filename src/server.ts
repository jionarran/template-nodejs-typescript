import 'express-async-errors';
import express, { Request, Response, Express, NextFunction } from 'express';
import * as Sentry from '@sentry/node';
import * as SentryTracing from '@sentry/tracing';
import helmet from 'helmet';
import cors from 'cors';
import config from 'config';

import * as database from '@src/database';
import routes from '@src/routes';
import AppError from '@src/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

const NODE_ENV = config.get<string>('App.env');
const SENTRY_DSN = config.get<string>('App.monitoring.sentry.dsn');

class App {
  public app: Express;

  constructor() {
    this.app = express();

    if (NODE_ENV !== 'development' && NODE_ENV !== 'test') {
      Sentry.init({
        dsn: SENTRY_DSN,
        integrations: [
          new Sentry.Integrations.Http({ tracing: true }),
          new SentryTracing.Integrations.Express({ app: this.app }),
        ],
        tracesSampleRate: 0.5,
      });
    }

    this.middlewares();
    this.database();
    this.routes();
    this.app.use(this.handleErrors);
  }

  private middlewares(): void {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(Sentry.Handlers.tracingHandler());
    this.app.use(cors());
    this.app.use(helmet());
    if (NODE_ENV !== 'test') {
      this.app.use(rateLimiter);
    }
    this.app.use(express.json());
  }

  private async database(): Promise<void> {
    await database.connect();
  }

  private routes(): void {
    this.app.use(routes);
    this.app.use(Sentry.Handlers.errorHandler());
  }

  private handleErrors(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
      return;
    }

    console.error(err);

    res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });

    next(err);
  }
}

export default new App().app;
