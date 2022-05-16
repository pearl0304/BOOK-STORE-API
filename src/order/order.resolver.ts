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
import { Order } from './schemas/order.schema';
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

  @ResolveField()
  async user(@Parent() user: User) {
    try {
    } catch (e) {}
  }

  async book(@Parent() book: Book) {
    try {
    } catch (e) {}
  }
}
