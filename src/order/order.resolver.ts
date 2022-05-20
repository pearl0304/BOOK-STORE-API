import {
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  ID,
} from '@nestjs/graphql';
import { OrderService } from './order.service';
import {
  Order,
  OrderResult,
  createOrderListInput,
  OrderStatus,
} from './schemas/order.schema';
import { ApolloError } from 'apollo-server-express';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/schemas/book.schema';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private orderService: OrderService,
    private bookService: BookService,
    private userService: UserService,
  ) {}

  @Query(() => OrderResult, { nullable: true })
  async findMyOrderList(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('status', { type: () => OrderStatus }) status: string,
  ) {
    try {
      return await this.orderService.findMyOrderList(userId, status);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Query(() => Order)
  async findOrderById(@Args('orderId', { type: () => ID }) orderId: string) {
    try {
      return this.orderService.findOrderById(orderId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Order, { nullable: true })
  async createOrderList(@Args('input') order: createOrderListInput) {
    try {
      // CHECK BOOK STOCK
      const book = await this.bookService.findBookById(order.bookId);
      if (book.stock == 0 || book.status === 'SOLD_OUT')
        throw new ApolloError('There no stock');

      return this.orderService.createOrderList(order);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => ID)
  async deleteOrder(@Args('orderId', { type: () => ID }) orderId: string) {
    try {
      return await this.orderService.deleteOrder(orderId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Order)
  async updateOrderStatus(
    @Args('orderId', { type: () => ID }) orderId: string,
    @Args('status', { type: () => OrderStatus }) status: string,
  ) {
    try {
      return await this.orderService.updateOrderStatus(orderId, status);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField()
  async user(@Parent() order: Order) {
    const { userId } = order;
    try {
      return this.userService.findUserById(userId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField()
  async book(@Parent() order: Order) {
    const { bookId } = order;
    try {
      return this.bookService.findBookById(bookId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
