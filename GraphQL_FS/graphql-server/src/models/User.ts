import { builder } from '../schema';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    createAt: t.expose('createdAt', { type: 'Date' }),
    messages: t.relation('messages'),
  }),
});
