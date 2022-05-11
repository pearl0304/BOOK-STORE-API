import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { Book, BookSchema } from './schemas/book.schema';
import { AuthorService } from '../author/author.service';
import { AuthorSchema, Author } from 'src/author/schemas/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema },
    ]),
  ],
  providers: [BookService, BookResolver, AuthorService],
})
export class BookModule {}
