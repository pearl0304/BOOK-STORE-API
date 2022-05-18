import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { LikeService } from 'src/like/like.service';
import { BookResolver } from './book.resolver';
import { Book, BookSchema } from './schemas/book.schema';
import { AuthorService } from '../author/author.service';
import { AuthorSchema, Author } from 'src/author/schemas/author.schema';
import { Like, LikeSchema } from 'src/like/schemas/like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Like.name, schema: LikeSchema },
    ]),
  ],
  providers: [BookService, BookResolver, AuthorService, LikeService],
})
export class BookModule {}
