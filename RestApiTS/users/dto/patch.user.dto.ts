import { PutUserDto } from './put.user.dto';

// Partial is a TypeScript feature that makes all properties of the copied type optional.
export interface PatchUserDto extends Partial<PutUserDto> {}
