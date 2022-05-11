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

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
  ) {}

  @Query(() => [Author], { nullable: 'items' })
  async findAllAuthors() {
    return this.authorService.findAllAuthors();
  }

  @Query(() => Author)
  async findAuthorById(@Args('id', { type: () => ID }) id: string) {
    return this.authorService.findAuthorById(id);
  }

  @Mutation(() => Author)
  async createAuthor(@Args('input') author: CreateAuthorInput) {
    return this.authorService.createAuthor(author);
  }
  @ResolveField()
  async book(@Parent() book: Book) {
    const { id } = book;
    return this.bookService.findBookById(id);
  }
}
