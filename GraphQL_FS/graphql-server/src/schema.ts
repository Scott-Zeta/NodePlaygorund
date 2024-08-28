import SchemaBuilder from '@pothos/core';
import { DateResolver } from 'graphql-scalars';

//import Scalars Date type to be used in the Schemabuilder
const builder = new SchemaBuilder<{
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
}>({});

builder.addScalarType('Date', DateResolver, {});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => 'world',
    }),
  }),
});

export const schema = builder.toSchema();
