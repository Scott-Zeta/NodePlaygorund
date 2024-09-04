// store types application needs
import type { GetUsersQuery } from './graphql/generated';

export type User = NonNullable<GetUsersQuery['users']>[0];
export type Message = NonNullable<
  NonNullable<GetUsersQuery['users']>[0]['messages']
>[0];
