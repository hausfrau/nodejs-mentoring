import {
    Request,
    Response,
    NextFunction
} from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../constants';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] as string;

    if (token) {
        jwt.verify(token, TOKEN_KEY, (error: any) => {
            if (error) {
                res.status(403).send(error);
            } else {
                next();
            }
        });
    } else {
        res.status(401).send();
    }
};
