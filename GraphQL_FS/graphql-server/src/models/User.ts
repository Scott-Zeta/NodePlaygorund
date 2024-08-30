import { builder } from '../builder';
import { prisma } from '../db';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    createAt: t.expose('createdAt', { type: 'Date' }),
    messages: t.relation('messages'),
  }),
});

// Define the query for "User"
// Adds a field to the GraphQL schema's Query type named "users"
builder.queryField('users', (t) =>
  // Defines a field that resolves to some type in your Prisma schema
  t.prismaField({
    // Lets Pothos know this field will resolve to an array of your Prisma Client's User type
    type: ['User'],
    // Sets up a resolver function for this field.
    resolve: async (query, root, args, ctx, info) => {
      return prisma.user.findMany({ ...query });
    },
  })
);
