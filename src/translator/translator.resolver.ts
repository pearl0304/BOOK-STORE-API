import {
  Resolver,
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
  ID,
} from '@nestjs/graphql';

import { Tranlator, CreateTranlatorInput } from './schemas/translator.schema';
import { TranslatorService } from './translator.service';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/schemas/book.schema';
import { ApolloError } from 'apollo-server-express';

@Resolver(() => Tranlator)
export class TranslatorResolver {
  constructor(
    private bookService: BookService,
    private translatorService: TranslatorService,
  ) {}

  @Query(() => [Tranlator], { nullable: 'itemsAndList' })
  async findAllTranslators() {
    try {
      return this.translatorService.findAllTranslators();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Query(() => Tranlator)
  async findTranslatorById(@Args('id', { type: () => ID }) id: string) {
    try {
      return this.translatorService.findTranslatorById(id);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => Tranlator)
  async createTranslator(@Args('input') translator: CreateTranlatorInput) {
    try {
      return this.translatorService.createTranslator(translator);
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
