import {
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { LikeService } from './like.service';
import { Like } from './schemas/like.schema';
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

  // findMyLikeList
  // findLikeUsers
  // doLike
}
