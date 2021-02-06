import * as AJV from 'ajv';
import { IAjvSimpleWrapperConfig } from './interfaces/IAjvSimpleWrapperConfig';
import { JsonSchema } from './interfaces/JsonSchema';

export class AjvSimpleWrapper {
  private ajv: AJV.Ajv = new AJV();
  private ajvValidate: AJV.ValidateFunction;
  private config: IAjvSimpleWrapperConfig;

  constructor(schema: JsonSchema, config?: Partial<IAjvSimpleWrapperConfig>) {
    if (!schema) {
      throw new Error('Schema required!');
    }

    if (!this.ajv.validateSchema(schema)) {
      throw new Error('Invalid schema!');
    }

    this.config = {
      throwOnValidationError: true,
      ...config,
    };

    this.ajvValidate = this.ajv.compile(schema);
  }

  public get errors(): AJV.ErrorObject[] | null {
    return this.ajvValidate.errors;
  }

  public validate = (input: unknown): boolean => {
    const valid = this.ajvValidate(input) as boolean;

    if (!valid && this.config.throwOnValidationError) {
      throw new AjvError('Validation failed!', this.errors);
    }

    return valid;
  };
}

class AjvError extends Error {
  public errors;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, ajvErrors: any[]) {
    super(message) /* istanbul ignore next - I don't know why that semicolon is 'uncovered' */;
    this.errors = ajvErrors;
  }
}
