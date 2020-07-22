module.exports = {
    type: process.env.CONNECTION_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [
       'src/entitiy/*.ts',
    ],
    migrations: [
       'src/migration/**/*.ts',
    ],
    subscribers: [
       'src/subscriber/**/*.ts',
    ],
    cli: {
       entitiesDir: 'src/app/models',
       migrationsDir: 'src/migration',
       subscribersDir: 'src/subscriber',
    },
 };