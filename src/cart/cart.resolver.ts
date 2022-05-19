import {
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  ID,
} from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart, CreateCartInput } from './schemas/cart.schema';
import { ApolloError } from 'apollo-server-express';
import { UserService } from 'src/user/user.service';
import { BookService } from 'src/book/book.service';

@Resolver(() => Cart)
export class CartResolver {
  constructor(
    private cartService: CartService,
    private userService: UserService,
    private bookService: BookService,
  ) {}

  @Query(() => [Cart], { nullable: 'itemsAndList' })
  async findMyCartList(@Args('userId', { type: () => ID }) userId: string) {
    try {
      return await this.cartService.findMyCartList(userId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Cart, { nullable: true })
  async createCart(@Args('input') cart: CreateCartInput) {
    try {
      return await this.cartService.createCart(cart);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => ID)
  async deleteCartByBookId(@Args('bookId', { type: () => ID }) bookId: string) {
    try {
      return await this.cartService.deleteCartByBookId(bookId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  @ResolveField()
  async user(@Parent() like: Cart) {
    const { userId } = like;
    try {
      return await this.userService.findUserById(userId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField()
  async book(@Parent() like: Cart) {
    const { bookId } = like;
    try {
      return await this.bookService.findBookById(bookId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
