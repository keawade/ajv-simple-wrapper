import { AjvSimpleWrapper } from '../src';

describe('AjvSimpleWrapper Wrapper Class', () => {
  it('should validate JSON against a JSON schema', () => {
    const ajvSimpleWrapper = new AjvSimpleWrapper({
      type: 'string',
    });

    const actual = ajvSimpleWrapper.validate('test');

    expect(actual).toBe(true);
  });

  describe('constructor', () => {
    it('should be new-able', () => {
      const ajvSimpleWrapper = new AjvSimpleWrapper({});

      expect(ajvSimpleWrapper).toBeInstanceOf(AjvSimpleWrapper);
    });

    it('should require a schema', () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        new AjvSimpleWrapper();
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Schema required!');
      }
    });

    it('should throw if JSON schema is invalid', () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new AjvSimpleWrapper({ type: 'not-real' } as any);
        fail('should have thrown an error');
      } catch (err) {
        expect(err.message).toBe('Invalid schema!');
      }
    });

    it('should accept a configuration object', () => {
      const ajvSimpleWrapper = new AjvSimpleWrapper({}, {});

      expect(ajvSimpleWrapper).toBeInstanceOf(AjvSimpleWrapper);
    });
  });

  describe('throwOnValidationError = true', () => {
    it('should throw if validation fails', () => {
      const ajvSimpleWrapper = new AjvSimpleWrapper({
        type: 'string',
      });

      try {
        ajvSimpleWrapper.validate(42);
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
  });

  describe('throwOnValidationError = false', () => {
    it('should not throw if validation fails', () => {
      const ajvSimpleWrapper = new AjvSimpleWrapper(
        {
          type: 'string',
        },
        {
          throwOnValidationError: false,
        }
      );

      const actual = ajvSimpleWrapper.validate(42);

      expect(actual).toBe(false);

      expect(ajvSimpleWrapper.errors).toStrictEqual([
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
    });
  });
});
