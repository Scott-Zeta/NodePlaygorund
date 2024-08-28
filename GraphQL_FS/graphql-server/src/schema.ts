import SchemaBuilder from '@pothos/core';
import { DateResolver } from 'graphql-scalars';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { prisma } from './db';

//import Scalars Date type to be used in the Schemabuilder
const builder = new SchemaBuilder<{
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
}>({ plugins: [PrismaPlugin], prisma: { client: prisma } });
//builder require a prisma instance

builder.addScalarType('Date', DateResolver, {});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => 'world',
    }),
  }),
});

export const schema = builder.toSchema();
