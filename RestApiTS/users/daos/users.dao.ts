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
}

export default new UsersDao();
