import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { ApolloError } from 'apollo-server-express';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private userModel: Model<OrderDocument>,
  ) {}
  async findAllMyOrderList() {
    try {
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
}
