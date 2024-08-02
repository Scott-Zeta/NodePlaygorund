import User from '../model/user.schema';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersAuthDao {
  // Get password for authentication
  async getUserByEmailWithPassword(email: string) {
    return User.findOne({ email: email })
      .select('_id email permissionFlags +password')
      .exec();
  }
}

export default new UsersAuthDao();
