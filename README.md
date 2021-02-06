# `ajv-simple-wrapper`

Provides a simple class wrapper for `ajv` to allow use of `ajv` in a way that I
prefer for simple validation.

## Usage

Install `ajv` and `ajv-simple-wrapper`.

```zsh
npm install ajv ajv-simple-wrapper
```

Import `ajv-simple-wrapper`, initialize, and validate.

```ts
import { AjvSimpleWrapper } from 'ajv-simple-wrapper';

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
const validator = new AjvSimpleWrapper(schema);

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
import { AjvSimpleWrapper } from 'ajv-simple-wrapper';

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
const validator = new AjvSimpleWrapper(schema, { throwOnValidationError: false });

const result = validator.validate({
  foo: 'a string',
  bar: 'not a number!',
});

if (!result) {
  console.error('Validation failed!', validator.errors);
}
```
