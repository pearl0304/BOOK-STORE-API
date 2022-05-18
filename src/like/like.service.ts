import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Like, LikeDocument } from './schemas/like.schema';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private bookModel: Model<LikeDocument>) {}
}
