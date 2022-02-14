import mongoose from 'mongoose';
import config from 'config';
import logger from '@src/logger';

const MONGO_URI = config.get<string>('App.mongoUri');

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    logger.info('Database connected');
  } catch (error) {
    logger.error(`Error in database connection - ${error.message}`);
    throw error;
  }
};

const disconnect = (
  force?: boolean,
  callback?: (err: any) => void,
): Promise<void> => mongoose.connection.close(force, callback);

export { connect, disconnect };
