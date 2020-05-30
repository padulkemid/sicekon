import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: [6, 'too few charachters'],
  },
  sex: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  const saltRounds = Number(process.env.SALT);
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
