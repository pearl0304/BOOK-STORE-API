import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TranslatorService } from './translator.service';
import { TranslatorResolver } from './translator.resolver';
import { Tranlator, TranlatorSchema } from './schemas/translator.schema';
import { BookService } from 'src/book/book.service';
import { Book, BookSchema } from '../book/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tranlator.name, schema: TranlatorSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  providers: [TranslatorService, TranslatorResolver, BookService],
})
export class TranslatorModule {}
