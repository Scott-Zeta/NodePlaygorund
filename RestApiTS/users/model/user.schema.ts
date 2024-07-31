import mongooseService from '../../common/services/mongoose.service';

const mongoose = mongooseService.getMongoose();
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: String,
    email: String,
    password: { type: String, select: false },
    firstName: String,
    lastName: String,
    permissionFlags: Number,
  },
  { id: false }
);

const User = mongoose.model('Users', userSchema);

export default User;
