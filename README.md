# `ajv-simple-wrapper`

An opinionated class wrapper for `ajv` that throws errors and is typed.

## Usage

Install `ajv` and `ajv-simple-wrapper`.

```zsh
npm install ajv ajv-simple-wrapper
```

Import `ajv-simple-wrapper`, initialize, and validate.

```ts
import { AjvSimpleWrapper as Ajv } from 'ajv-simple-wrapper';

const schema = {
  type: 'object'
  properties: {
    foo: {
      type: 'string'
    },
    bar: {
      type: 'number'
    }
  }
};
const validator = new Ajv(schema);

try {
  const result = validator.validate({
    foo: 'a string',
    bar: 'not a number!',
  });
} catch (err) {
  console.error('Validation failed!', err);
}
```

### Error Handling

Alternatively, you can initialize your ajv wrapper with a configuration of
`throwOnValidationError: false` to not throw when an error occurs.

```ts
import { AjvSimpleWrapper as Ajv } from 'ajv-simple-wrapper';

const schema = {
  type: 'object'
  properties: {
    foo: {
      type: 'string'
    },
    bar: {
      type: 'number'
    }
  }
};

const validator = new Ajv(schema, { throwOnValidationError: false });

const result = validator.validate({
  foo: 'a string',
  bar: 'not a number!',
});

if (!result) {
  // Errors from the last validation will be available on the validator.errors
  console.error('Validation failed!', validator.errors);
}
```
