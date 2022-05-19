import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateLikeInput, Like, LikeDocument } from './schemas/like.schema';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

  async findMyLikeList(userId: string): Promise<Like[]> {
    try {
      return await this.likeModel.find({ userId: userId }).exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async findUserLike(bookId: string) {
    try {
      return await this.likeModel.find({ bookId: bookId }).exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async doLike(like: CreateLikeInput) {
    const { action } = like;
    try {
      let result = null;
      if (action == 'ADD') {
        // CHECK DUPLICATE
        const check_duplecate = await this.likeModel
          .findOne({
            userId: like.userId,
            bookId: like.bookId,
          })
          .exec();
        if (check_duplecate) throw new ApolloError('Alreay you done like');
        result = await this.likeModel.create(like);
        return {
          id: result._id,
          ...like,
        };
      } else {
        // WHEN ACTION TYPE  IS REMOVE
        if (!like.id) throw new ApolloError('Please input id');
        const check_id = await this.likeModel.findById(like.id);
        if (!check_id) throw new ApolloError('There no data');

        await this.likeModel.deleteOne({ _id: like.id });
        result = null;
      }
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async deleteLike(bookId: string) {
    try {
      await this.likeModel.deleteMany({ bookId: bookId });
      return bookId;
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
