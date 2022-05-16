import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserDocument,
  CreateUserInput,
  UpdateUserInput,
} from './schemas/user.schema';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAllUsers(): Promise<User[]> {
    try {
      // TODO: ADD PAGENATION
      return this.userModel.find().sort({ created_date: -1 }).exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async findUserById(userId: string): Promise<User> {
    try {
      return this.userModel.findById(userId).exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async createUser(user: CreateUserInput) {
    try {
      // CHECK DUPLICATE EAMIL AND NICKNAME
      const checnkEmail = await this.userModel
        .findOne({ email: user.email })
        .exec();

      const checkNick = await this.userModel
        .findOne({ nick: user.nick })
        .exec();
      if (checnkEmail) throw new ApolloError('This email is in use');
      if (checkNick) throw new ApolloError('This nickname is in use');

      const data = {
        ...user,
        created_date: new Date(),
        is_delete: false,
      };

      const result = await this.userModel.create(data);
      return {
        id: result._id,
        ...data,
      };

      // TODO:  GEMERATE JWT TOKEN
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  async updateUserInfo(userId: string, user: UpdateUserInput) {
    try {
      // CHECK User
      const checkUser = await this.userModel.findOne({ _id: userId }).exec();
      if (!checkUser) throw new ApolloError('Threr is no informaton on User');
      //console.log(checkUser);

      // CHECK DUPLICATE NICKNAME
      if (user.nick) {
        const checkNick = await this.userModel
          .findOne({ nick: user.nick })
          .exec();
        if (checkNick) throw new ApolloError('This nickname is in use');
      }

      // UPDATE USER INFOMATION
      const data = {
        ...user,
        update_date: new Date(),
      };

      await this.userModel.findOneAndUpdate(
        { _id: userId },
        { ...data },
        { new: true },
      );

      const result = {
        id: userId,
        ...data,
      };

      return result;
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  async deleteUser(userId: string) {
    try {
      // CHECK User
      const checkUser = await this.userModel.findOne({ _id: userId }).exec();
      if (!checkUser) throw new ApolloError('Threr is no informaton on User');

      const data = {
        delete_date: new Date(),
        is_delete: true,
      };

      await this.userModel.findOneAndUpdate(
        { _id: userId },
        { ...data },
        { new: true },
      );

      return userId;
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  async deleteUserByAdmin(userId: string) {
    try {
      // CHECK User
      const checkUser = await this.userModel.findOne({ _id: userId }).exec();
      if (!checkUser) throw new ApolloError('Threr is no informaton on User');

      await this.userModel.deleteOne({ _id: userId });

      return userId;
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
