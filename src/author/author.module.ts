import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { Author, AuthorSchema } from './schemas/author.schema';
import { BookService } from 'src/book/book.service';
import { Book, BookSchema } from '../book/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Author.name, schema: AuthorSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  providers: [AuthorResolver, AuthorService, BookService],
})
export class AuthorModule {}
