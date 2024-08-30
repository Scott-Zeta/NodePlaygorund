import { builder } from '../schema';

builder.prismaObject('Message', {
  fields: (t) => ({
    id: t.exposeID('id'),
    body: t.exposeString('body'),
    createdAt: t.expose('createdAt', {
      type: 'Date',
    }),
  }),
});
