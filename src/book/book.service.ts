import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Book, BookDocument, CreateBookInput } from './schemas/book.schema';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAllBooks(): Promise<Book[]> {
    try {
      return this.bookModel.find().lean();
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  async findBookById(bookId: string): Promise<Book> {
    try {
      return await this.bookModel.findById(bookId).lean();
    } catch (e) {
      throw new ApolloError(e);
    }
  }
  async createBook(book: CreateBookInput) {
    try {
      //TODO: CHECK DUPLICATED
      const result = await this.bookModel.create(book);
      return {
        id: result._id,
        ...book,
      };
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
