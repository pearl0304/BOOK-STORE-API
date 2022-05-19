import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { LikeService } from 'src/like/like.service';
import { BookResolver } from './book.resolver';
import { Book, BookSchema } from './schemas/book.schema';
import { AuthorService } from '../author/author.service';
import { AuthorSchema, Author } from 'src/author/schemas/author.schema';
import { Like, LikeSchema } from 'src/like/schemas/like.schema';
import { TranslatorService } from 'src/translator/translator.service';
import {
  Tranlator,
  TranlatorSchema,
} from 'src/translator/schemas/translator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Like.name, schema: LikeSchema },
      { name: Tranlator.name, schema: TranlatorSchema },
    ]),
  ],
  providers: [
    BookService,
    BookResolver,
    AuthorService,
    LikeService,
    TranslatorService,
  ],
})
export class BookModule {}
