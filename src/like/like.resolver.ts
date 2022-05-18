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
  async findMyLikeList() {
    try {
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  @Query(() => [Like], { nullable: 'itemsAndList' })
  async findUserLike() {
    try {
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Like, { nullable: true })
  async doLike(@Args('input') like: CreateLikeInput) {
    try {
      return this.likeService.doLike(like);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  // @ResolveField()
  // async user(@Parent()) {}

  // @ResolveField()
  // async book(@Parent()) {}
}
