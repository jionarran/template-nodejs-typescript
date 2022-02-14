import './module-alias';
import config from 'config';
import server from '@src/server';
import * as database from '@src/database';
import logger from './logger';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`,
  );

  throw reason;
});

process.on('uncaughtException', error => {
  console.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
});

const PORT = config.get<number>('App.port');

const app = server.listen(PORT, () =>
  logger.info(`App listening on port ${PORT}`),
);

const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGQUIT'];
exitSignals.forEach(signal =>
  process.on(signal, async () => {
    try {
      await app.close(() => console.log('App closed with success'));
      await database.disconnect(false, () =>
        console.log('MongoDB connection closed with success'),
      );
    } catch (error) {
      console.log(`App exited with error ${error}`);
      process.exit(ExitStatus.Failure);
    }
  }),
);
