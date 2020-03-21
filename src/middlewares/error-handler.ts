import {
    Request,
    Response,
    NextFunction
} from 'express';
import { winstonLogger } from './winston-logger';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    winstonLogger.error(`[method: ${req.method}] ${error}`);

    res.status(500).send(error);
    next();
};
