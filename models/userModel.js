import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', schema);

export default User;
