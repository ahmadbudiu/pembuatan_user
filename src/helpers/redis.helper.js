const redis = require('redis');
const redisClient = redis.createClient();

exports.set = (key, value) => {
    redisClient.set(key, JSON.stringify(value));
};

exports.delete = (key) => {
    redisClient.del(key);
};
