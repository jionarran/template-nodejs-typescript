import config from 'config';
import winston from 'winston';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Logsene from 'winston-logsene';

const token = config.get('App.logger.sematext.token');
const level = config.get('App.logger.sematext.level');

const transports = [
  new winston.transports.Console({
    format: winston.format.simple(),
    level: String(level) || 'debug',
  }),
];

if (token) {
  transports.push(
    new Logsene({
      token,
      type: 'application',
      level: level || 'debug',
    }),
  );
}

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports,
});

export default logger;
