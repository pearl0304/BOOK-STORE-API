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
import { Book, CrateBookInput } from './schemas/book.schema';
import { Author } from 'src/author/schemas/author.schema';
import { ID } from '@nestjs/graphql';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
  ) {}

  @Query(() => [Book], { nullable: 'items' })
  async findAllBooks() {
    return this.bookService.findAllBooks();
  }

  @Query(() => Book)
  async findBookById(@Args('id', { type: () => ID }) id: string) {
    return this.bookService.findBookById(id);
  }

  @Mutation(() => Book)
  async createBook(@Args('input') book: CrateBookInput) {
    return this.bookService.createBook(book);
  }

  @ResolveField()
  async author(@Parent() author: Author) {
    const { id } = author;
    return this.authorService.findAuthorById(id);
  }
}
