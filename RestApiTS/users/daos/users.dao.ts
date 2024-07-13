import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';

import shortid from 'shortid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

/*
Using the singleton pattern, this class will always provide the same instance—and, 
critically, the same users array—when we import it in other files.  
*/

class UsersDao {
  users: Array<CreateUserDto> = [];

  constructor() {
    log('Created new instance of UsersDao');
  }
  // For CRUD operations
  // Create functions
  async addUser(user: CreateUserDto) {
    user.id = shortid.generate();
    this.users.push(user);
    return user.id;
  }
  // Read functions
  // Read all resources
  async getUsers() {
    return this.users;
  }
  // Read one by ID
  async getUserById(userId: string) {
    return this.users.find((user: { id: string }) => user.id === userId);
  }
  // Update functions
  // Overwrite entire object as PUT
  async putUserById(userId: string, user: PutUserDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );
    this.users.splice(objIndex, 1, user);
    return `${user.id} updated via put`;
  }
  // Update part of object as PATCH
  async patchUserById(userId: string, user: PatchUserDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );
    let currentUser = this.users[objIndex];
    const allowedPatchFields = [
      'password',
      'firstName',
      'lastName',
      'permissionLevel',
    ];
    for (let field of allowedPatchFields) {
      if (field in user) {
        // @ts-ignore
        currentUser[field] = user[field];
      }
    }
    this.users.splice(objIndex, 1, currentUser);
    return `${user.id} patched`;
  }
  // Delete functions
  async removeUserById(userId: string) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );
    this.users.splice(objIndex, 1);
    return `${userId} removed`;
  }
}

export default new UsersDao();
