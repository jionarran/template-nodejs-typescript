require('dotenv').config();

module.exports = {
  App: {
    port: '1234',
    env: 'development',
    auth: { secretApp: 'secret-app', expiresIn: '1d' },
    mongoUri: 'fake-mongo-uri',
    monitoring: {
      sentry: { dsn: 'sentry-dsn' },
    },
    jobs: {
      redisUri: 'redis://localhost:6379',
    },
    logger: {
      sematext: {
        token: '',
        level: 'debug',
      },
    },
  },
};
