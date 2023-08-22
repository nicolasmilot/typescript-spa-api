import Joi from "joi";

export class Request {
    private validationSchema: Joi.Schema|null = null;
    private errors: { [key: string|number]: string; } = {};
    private valid: boolean = false;

    public constructor(
        protected content: any,
    ) {}

    protected setValidationSchema(schema: Joi.Schema): void {
        this.validationSchema = schema;
    }

    public validate(): boolean {
        if (!this.validationSchema) {
            return true;
        }

        const validation = this.validationSchema.validate(this.content, {
            abortEarly: false
        });

        if (!validation.error) {
            this.valid = true;
        } else {
            this.assembleErrors(validation.error);
        }

        return this.isValid();
    }

    public isValid(): boolean {
        return this.valid;
    }

    public getErrors(): { [key: string|number]: string; } {
        return this.errors;
    }

    private assembleErrors(validationErrors: Joi.ValidationError): void
    {
        for (
            const { path: [field], type } of validationErrors.details
        ) {
            this.errors[field] = type
        }
    }
}
