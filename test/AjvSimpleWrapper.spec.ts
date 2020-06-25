import { Ajv } from '../src';

describe('Ajv Wrapper Class', () => {
  it('should be new-able', () => {
    const ajv = new Ajv({});

    expect(ajv).toBeInstanceOf(Ajv);
  });

  it('should throw errors if validation fails', () => {
    const ajv = new Ajv({
      type: 'string',
    });

    try {
      ajv.validate(42);
      fail('should have thrown an error');
    } catch (err) {
      expect(err.message).toBe('Validation failed!');
      expect(err.errors).toStrictEqual([
        {
          dataPath: '',
          keyword: 'type',
          message: 'should be string',
          params: {
            type: 'string',
          },
          schemaPath: '#/type',
        },
      ]);
    }
  });

  it('should throw an error if JSON schema is invalid', () => {
    try {
      new Ajv({ type: 'not-real' });
      fail('should have thrown an error');
    } catch (err) {
      expect(err.message).toBe('Invalid schema!');
    }
  });

  it('should validate JSON against a JSON schema', () => {
    const ajv = new Ajv({
      type: 'string',
    });

    const actual = ajv.validate('test');

    expect(actual).toBe(true);
  });
});
