import { default as Ajv, ValidateFunction, ErrorObject } from 'ajv';
import { IAjvSimpleWrapperConfig } from './interfaces/IAjvSimpleWrapperConfig';
import { JsonSchema } from './interfaces/JsonSchema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AjvSimpleWrapper {
  private ajv: Ajv = new Ajv();
  private ajvValidate: ValidateFunction;
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

  public get errors(): ErrorObject[] | null {
    return this.ajvValidate.errors;
  }

  public validate = (input: unknown): boolean => {
    const valid = this.ajvValidate(input);

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
