import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateOrderListInput,
  Order,
  OrderDocument,
} from './schemas/order.schema';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async findMyOrderList(userId: string, status: string) {
    try {
      const proc = await this.orderModel
        .find({ userId: userId, status: status })
        .exec();

      let total_price = 0;
      proc.forEach((element) => {
        total_price += element['sale_price'];
      });

      const total_count = await this.orderModel
        .find({ userId: userId, status: status })
        .count()
        .exec();

      return { list: proc, total_price: total_price, total_count: total_count };
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async findOrderById(orderId: string) {
    try {
      return await this.orderModel.findById({ _id: orderId }).exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async CreateOrderList(order: CreateOrderListInput) {
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
