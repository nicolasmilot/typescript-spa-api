import { NextFunction, Request as ExpressRequest, RequestHandler, Response } from 'express';
import { Request } from '@lib/requests/request';

export const RequestHandlerMiddleware = (instanceOfRequest: typeof Request) => {
    return async (req: ExpressRequest, res: Response, next: NextFunction) => {
        const request: Request = new instanceOfRequest(req);

        if (!request.validate()) {
            return res.status(422).send(request.getErrors())
        }

        next();
    };
};