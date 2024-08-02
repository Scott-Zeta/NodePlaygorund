import UsersAuthDao from '../daos/users.auth.dao';

class UsersAuthService {
  async getUserByEmailWithPassword(email: string) {
    return UsersAuthDao.getUserByEmailWithPassword(email);
  }
}

export default new UsersAuthService();
