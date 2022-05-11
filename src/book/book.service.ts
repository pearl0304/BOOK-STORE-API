import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Book, BookDocument, CrateBookInput } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAllBooks(): Promise<Book[]> {
    return this.bookModel.find().lean();
  }
  async findBookById(bookId: string): Promise<Book[]> {
    return await this.bookModel.findById(bookId).lean();
  }
  async createBook(book: CrateBookInput) {
    //TODO: CHECK DUPLICATED
    const result = await this.bookModel.create(book);
    return {
      id: result._id,
      ...book,
    };
  }
}
