import { Document } from 'mongoose';

export interface UserModel extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface User extends Omit<UserModel, '_id'> {}
