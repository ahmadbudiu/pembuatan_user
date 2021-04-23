const redis = require('redis');
const ResponseHelper = require('../helpers/response.helper');

const redisMiddleware = (request, response, next) => {
    const redisClient = redis.createClient();

    const redisKey = 'az-' + request.originalUrl;
    redisClient.get(redisKey, function (error, reply) {
        if (error) {
            return (new ResponseHelper(response)).error(false, 500);
        }
        if (reply === null) {
            next();
        } else {
            return (new ResponseHelper(response)).success(JSON.parse(reply));
        }
    });
};

module.exports = redisMiddleware;
