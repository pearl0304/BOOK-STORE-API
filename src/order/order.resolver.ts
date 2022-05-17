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
import { Order, CreateOrderInput } from './schemas/order.schema';
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

  @Query(() => [Order], { nullable: 'itemsAndList' })
  async findAllMyOrderList() {
    try {
      return this.orderService.findAllMyOrderList();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Query(() => Order)
  async findOrderById() {
    try {
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Order, { nullable: true })
  async doOrderBook(@Args('input') order: CreateOrderInput) {
    try {
      return this.orderService.doOrderBook(order);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField()
  async user(@Parent() order: Order) {
    const { userId } = order;
    console.log('userId', userId);
    try {
    } catch (e) {}
  }
}
