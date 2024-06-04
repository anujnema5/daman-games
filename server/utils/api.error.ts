class ApiError {
    statusCode: number;
    message: string;
    data: null;
    success: boolean;
    errors: any[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: any[] = [],
    ) {
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
    }
}

class CustomError extends Error {
    statusCode: number

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }
}

export { CustomError, ApiError }