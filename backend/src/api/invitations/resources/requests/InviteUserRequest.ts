import Joi from 'joi';
import { Request as ExpressRequest } from 'express';
import { Request } from '@lib/requests/request';

export interface InviteUserRequestContent {
    email: string;
}

export class InviteUserRequest extends Request {
    private readonly schema: Joi.Schema = Joi.object({
        email: Joi.string().email().required(),
    });

    public constructor(
        req: ExpressRequest
    ) {
        super(req.body);
        this.setValidationSchema(this.schema);
    }
}