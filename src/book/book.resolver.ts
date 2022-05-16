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
import { Book, CreateBookInput } from './schemas/book.schema';
import { Author } from 'src/author/schemas/author.schema';
import { ID } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
  ) {}

  @Query(() => [Book], { nullable: 'itemsAndList' })
  async findAllBooks() {
    try {
      return this.bookService.findAllBooks();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Query(() => Book)
  async findBookById(@Args('id', { type: () => ID }) id: string) {
    try {
      return this.bookService.findBookById(id);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Book)
  async createBook(@Args('input') book: CreateBookInput) {
    try {
      return this.bookService.createBook(book);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField()
  async author(@Parent() book: Book) {
    const { authorId } = book;
    console.log(authorId);
    try {
      return this.authorService.findAuthorById(authorId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
