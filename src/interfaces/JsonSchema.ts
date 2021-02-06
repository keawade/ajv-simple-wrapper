export type JsonSchema =
  | Record<string, unknown>
  | JsonSchemaString
  | JsonSchemaNumber
  | JsonSchemaObject
  | JsonSchemaArray
  | JsonSchemaBoolean
  | JsonSchemaNull;

type JsonSchemaString = {
  type: 'string';
  enum?: readonly string[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?:
    | 'date-time'
    | 'date'
    | 'time'
    | 'email'
    | 'idn-email'
    | 'ipv4'
    | 'ipv6'
    | 'uri'
    | 'uri-reference'
    | 'iri'
    | 'iri-reference'
    | 'uri-template'
    | 'json-pointer'
    | 'regex';
};

type JsonSchemaNumber = {
  type: 'number' | 'integer';
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
};

type JsonSchemaObject = {
  type: 'object';
  required?: string[];
  additionalProperties?: boolean;
  properties?: {
    [key: string]: JsonSchema;
  };
  minProperties?: number;
  maxProperties?: number;
  dependencies?: {
    [key: string]: Array<string | JsonSchema>;
  };
  patternProperties?: {
    [key: string]: JsonSchema;
  };
};

type JsonSchemaArray = {
  type: 'array';
  items?: JsonSchema | JsonSchema[];
  contains?: JsonSchema | JsonSchema[];
  additionalItems?: boolean;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
};

type JsonSchemaBoolean = {
  type: 'boolean';
};

type JsonSchemaNull = {
  type: 'null';
};
