import { Request, NextFunction, Response } from 'express';
import Error from '../interface/Error.interface';
const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = error.status || 500;
    const message = error.message || 'something wrong!';
    res.status(status).json({ status, message });
};

export default errorMiddleware;
