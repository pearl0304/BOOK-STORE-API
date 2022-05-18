import {
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorService } from 'src/author/author.service';
import { BookService } from './book.service';
import { LikeService } from 'src/like/like.service';
import { Book, CreateBookInput } from './schemas/book.schema';
import { ID } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private likeService: LikeService,
  ) {}

  @Query(() => [Book], { nullable: 'itemsAndList' })
  async findAllBooks() {
    try {
      return await this.bookService.findAllBooks();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Query(() => Book)
  async findBookById(@Args('id', { type: () => ID }) id: string) {
    try {
      return await this.bookService.findBookById(id);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Book)
  async createBook(@Args('input') book: CreateBookInput) {
    try {
      return await this.bookService.createBook(book);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField()
  async author(@Parent() book: Book) {
    const { authorId } = book;
    try {
      return await this.authorService.findAuthorById(authorId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField()
  async like(@Parent() book: Book) {
    const { id } = book;
    try {
      const result = await this.likeService.findUserLike(id);
      return result;
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField()
  async total_like(@Parent() book: Book) {
    const { id } = book;
    try {
      const result = await this.likeService.findUserLike(id);
      return result.length;
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
