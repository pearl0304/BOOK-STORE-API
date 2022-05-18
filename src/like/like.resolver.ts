import {
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { LikeService } from './like.service';
import { CreateLikeInput, Like } from './schemas/like.schema';
import { ID } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { UserService } from 'src/user/user.service';
import { BookService } from 'src/book/book.service';

@Resolver(() => Like)
export class LikeResolver {
  constructor(
    private likeService: LikeService,
    private userService: UserService,
    private bookService: BookService,
  ) {}

  @Query(() => [Like], { nullable: 'itemsAndList' })
  async findMyLikeList(@Args('userId', { type: () => ID }) userId: string) {
    try {
      return await this.likeService.findMyLikeList(userId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  @Query(() => [Like], { nullable: 'itemsAndList' })
  async findUserLike(@Args('bookId', { type: () => ID }) bookId: string) {
    try {
      return await this.likeService.findUserLike(bookId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Like, { nullable: true })
  async doLike(@Args('input') like: CreateLikeInput) {
    try {
      return await this.likeService.doLike(like);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => ID)
  async deleteLike(@Args('bookId', { type: () => ID }) bookId: string) {
    try {
      return await this.likeService.deleteLike(bookId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  @ResolveField()
  async user(@Parent() like: Like) {
    const { userId } = like;
    try {
      return await this.userService.findUserById(userId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField()
  async book(@Parent() like: Like) {
    const { bookId } = like;
    try {
      return await this.bookService.findBookById(bookId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
