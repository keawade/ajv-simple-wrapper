import * as AJV from 'ajv';
import { JsonObject, Json } from './interfaces/Json';

export class AjvClass {
  private ajv: AJV.Ajv = new AJV();
  private ajvValidate: AJV.ValidateFunction;

  constructor(schema: JsonObject) {
    if (!this.ajv.validateSchema(schema)) {
      throw new Error('Invalid schema!');
    }

    this.ajvValidate = this.ajv.compile(schema);
  }

  public validate = (input: JsonObject | Json) => {
    const valid = this.ajvValidate(input);

    if (!valid) {
      throw new AjvError('Validation failed!', this.ajvValidate.errors);
    }

    return valid;
  };
}

class AjvError extends Error {
  public errors;

  constructor(message: string, ajvErrors: any[]) {
    super(message) /* istanbul ignore next - I don't know why that semicolon is 'uncovered' */;
    this.errors = ajvErrors;
  }
}
