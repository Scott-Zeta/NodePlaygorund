import SchemaBuilder from '@pothos/core';
import { DateResolver } from 'graphql-scalars';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { prisma } from './db';

//import Scalars Date type to be used in the Schemabuilder
export const builder = new SchemaBuilder<{
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});
//builder require a prisma instance

builder.addScalarType('Date', DateResolver, {});

//initialize the query type
builder.queryType({});

export const schema = builder.toSchema();
