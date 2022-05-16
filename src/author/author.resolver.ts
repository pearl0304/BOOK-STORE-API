import {
  Resolver,
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import { AuthorService } from './author.service';
import { BookService } from 'src/book/book.service';
import { Author, CreateAuthorInput } from './schemas/author.schema';
import { Book } from 'src/book/schemas/book.schema';
import { ID } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
  ) {}

  @Query(() => [Author], { nullable: 'items' })
  async findAllAuthors() {
    try {
      return this.authorService.findAllAuthors();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Query(() => Author)
  async findAuthorById(@Args('id', { type: () => ID }) id: string) {
    try {
      return this.authorService.findAuthorById(id);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Author)
  async createAuthor(@Args('input') author: CreateAuthorInput) {
    try {
      return this.authorService.createAuthor(author);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  @ResolveField()
  async book(@Parent() book: Book) {
    const { id } = book;
    try {
      return this.bookService.findBookById(id);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
