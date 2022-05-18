import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderInput, Order, OrderDocument } from './schemas/order.schema';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}
  async findAllMyOrderList(userId: string) {
    try {
      return await this.orderModel.find({ userId: userId }).exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  async findOrderById() {
    try {
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  async doOrderBook(order: CreateOrderInput) {
    try {
      const data = {
        ...order,
        status: 'PENDING',
        created_date: new Date(),
      };

      const result = await this.orderModel.create(data);

      return {
        id: result._id,
        ...data,
      };
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
