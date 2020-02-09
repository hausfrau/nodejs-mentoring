export function errorResponse(schemaErrors) {
    const errors = schemaErrors.map((error) => {
        let {path, message} = error;
        return {path, message};
    });
    return {
        status: 'failed',
        errors
    }
};

export function validateBodySchema(schema) {
    return (req, res, next) => {
        const {error} = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    };
}

export function validateQuerySchema(schema) {
    return (req, res, next) => {
        const {error} = schema.validate(req.query, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    };
}

export function validateParamsSchema(schema) {
    return (req, res, next) => {
        const {error} = schema.validate(req.params, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    };
}
