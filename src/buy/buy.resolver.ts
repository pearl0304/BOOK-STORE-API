import {
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  ID,
} from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { Buy, BuyInputType, PaymentStatus } from './schemas/buy.schema';
import { BuyService } from './buy.service';
import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';
import { OrderService } from 'src/order/order.service';

@Resolver(() => Buy)
export class BuyResolver {
  constructor(
    private buyService: BuyService,
    private orderService: OrderService,
    private bookService: BookService,
    private userService: UserService,
  ) {}

  @Query(() => [Buy])
  async findMyBuyList(@Args('userId', { type: () => ID }) userId: string) {
    try {
      return this.buyService.findMyBuyList(userId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Query(() => [Buy])
  async findBuyListById(@Args('buyId', { type: () => ID }) buyId: string) {
    try {
      return this.buyService.findBuyListById(buyId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Buy)
  async buyBooks(@Args('input') buy: BuyInputType) {
    try {
      return this.buyService.buyBooks(buy);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Buy)
  async updatePaymentStatus(
    @Args('buyId', { type: () => ID }) buyId: string,
    @Args('payment_status', { type: () => PaymentStatus })
    payment_status: string,
  ) {
    try {
      return this.buyService.updatePaymentStatus(buyId, payment_status);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField()
  async order(@Parent() buy: Buy) {
    try {
      const orderIds = buy.orderIds;
      const arr = orderIds.map(async (order) => {
        return await this.orderService.findOrderById(order);
      });
      const result = Promise.all(arr);
      return result;
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
