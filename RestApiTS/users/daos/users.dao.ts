import User from '../model/user.schema';
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
/* 
In real production, all these will be replace by
data base connection libaraies like mongoose or any other ORM
*/
class UsersDao {
  constructor() {
    log('Created new instance of UsersDao');
  }
  // For CRUD operations
  // Create functions
  async addUser(user: CreateUserDto) {}
  // Read functions
  // Read all resources
  async getUsers() {}
  // Read one by ID
  async getUserById(userId: string) {}
  // Update functions
  // Overwrite entire object as PUT
  async putUserById(userId: string, user: PutUserDto) {}
  // Update part of object as PATCH
  async patchUserById(userId: string, user: PatchUserDto) {}
  // Delete functions
  async removeUserById(userId: string) {}
  // Bonus for get user by email to check duplicate
  async getUserByEmail(email: string) {}
}

export default new UsersDao();
