import { Request } from '@lib/requests/request';
import Joi from "joi";
import { Request as ExpressRequest } from "express";

export interface GetInvitationByIdRequestParams {
    id: string
}

export class GetInvitationByIdRequest extends Request {
    private readonly schema: Joi.Schema = Joi.object({
        id: Joi.string().uuid({
            version: [
                'uuidv4',
            ]
        }).required(),
    });

    public constructor(
        req: ExpressRequest
    ) {
        super(req.params);
        this.setValidationSchema(this.schema);
    }
}