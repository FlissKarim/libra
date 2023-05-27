module.exports = {
  app: {
    port: 3000,
  },
  jwt: {
    jwt_secret: 'FAKE_SECRET',
    jwt_session: {
      session: false,
    },
  },
  typeorm: {
    type: 'sqlite',
    host: 'sqlite',
    port: 8191,
    username: 'sqlite',
    password: 'sqlite',
    database: 'sqlite.sql',
    synchronize: false,
    logging: false,
  },
  swagger: {
    base_path: '/',
  },
  account: {
    salt: 'FAKE_SALT',
  },
};
