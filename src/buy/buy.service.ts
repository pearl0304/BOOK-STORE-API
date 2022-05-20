import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Buy, BuyDocument, BuyInputType } from './schemas/buy.schema';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class BuyService {
  constructor(@InjectModel(Buy.name) private buyModel: Model<BuyDocument>) {}

  async findMyBuyList(userId: string) {
    try {
      return await this.buyModel.find({ userId: userId });
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async findBuyListById(buyId: string) {
    try {
      return await this.buyModel.find({ _id: buyId });
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async buyBooks(buy: BuyInputType) {
    try {
      const data = {
        ...buy,
        created_date: new Date(),
      };
      const proc = await this.buyModel.create(data);
      return {
        id: proc._id,
        ...data,
      };
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async updatePaymentStatus(buyId: string, payment_status: string) {
    try {
      return await this.buyModel.findOneAndUpdate(
        { _id: buyId },
        { $set: { payment_status: payment_status } },
        { new: true },
      );
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
