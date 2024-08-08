import User from '../model/user.schema';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PermissionFlag } from '../../common/middleware/common.permissionflag.enum';

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
  users: Array<CreateUserDto> = [];

  constructor() {
    log('Created new instance of UsersDao');
  }
  // For CRUD operations
  // Create functions
  async addUser(userFields: CreateUserDto) {
    const userId = shortid.generate();
    const user = new User({
      _id: userId,
      ...userFields,
      permissionFlags: PermissionFlag.FREE_PERMISSION,
    });
    await user.save();
    return userId;
  }
  // Read functions
  // Read all resources, add Pagination
  async getUsers(limit = 25, page = 0) {
    return User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  // Read one by ID
  async getUserById(userId: string) {
    return User.findOne({ _id: userId }).exec();
  }
  async getUserByEmail(email: string) {
    return User.findOne({ email: email }).exec();
  }

  // Update functions
  /* Mongoose findOneAndUpdate() function can update the entire document 
    or just part of it. So no need two for update and patch*/
  async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
    const existingUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true } //return the updated document
    ).exec();

    return `${userId} updated`;
  }

  // Delete functions
  async removeUserById(userId: string) {
    User.deleteOne({ _id: userId }).exec();
    return `${userId} removed`;
  }
}

export default new UsersDao();
