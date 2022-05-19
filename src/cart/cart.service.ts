import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Cart, CartDocument, CreateCartInput } from './schemas/cart.schema';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async findMyCartList(userId: string): Promise<Cart[]> {
    try {
      return await this.cartModel.find({ userId: userId }).exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async createCart(cart: CreateCartInput) {
    const { action } = cart;
    try {
      let result = null;
      if (action == 'ADD') {
        // CHECK DUPLICATE
        const check_duplecate = await this.cartModel
          .findOne({
            userId: cart.userId,
            bookId: cart.bookId,
          })
          .exec();
        if (check_duplecate) throw new ApolloError('Alreay you done like');
        result = await this.cartModel.create(cart);
        return {
          id: result._id,
          ...cart,
        };
      } else {
        // WHEN ACTION TYPE  IS REMOVE
        if (!cart.id) throw new ApolloError('Please input id');
        const check_id = await this.cartModel.findById(cart.id);
        if (!check_id) throw new ApolloError('There no data');

        await this.cartModel.deleteOne({ _id: cart.id });
        result = null;
      }
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async deleteCartByBookId(bookId: string) {
    try {
      await this.cartModel.deleteMany({ bookId: bookId });
      return bookId;
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
