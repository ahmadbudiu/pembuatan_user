const env = {
    port: 3000,
    database: 'az_solusindo',
    username: 'root2',
    password: 'root',
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;
