class ResponseHelper {
    response;

    constructor(response) {
        this.response = response;
    }

    success(data) {
        return this.response.status(200).json(this.generate(data));
    }

    error(data, statusCode = 500, errors = undefined, message = undefined) {
        return this.response.status(statusCode).json(this.generate(data, statusCode, errors, message));
    }

    generate(data, statusCode = 200, errors = undefined, message = undefined) {
        return {
            data: data,
            statusCode: statusCode,
            errors: errors,
            message: message,
        }
    }
}

module.exports = ResponseHelper;
