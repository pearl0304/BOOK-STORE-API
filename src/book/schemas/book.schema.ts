import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import {
  Field,
  Int,
  ObjectType,
  ID,
  InputType,
  Float,
  registerEnumType,
  ArgsType,
} from '@nestjs/graphql';
import { Author } from '../../author/schemas/author.schema';
import { Tranlator } from 'src/translator/schemas/translator.schema';
import { Like } from 'src/like/schemas/like.schema';

export type BookDocument = Book & Document;

@Schema()
export class BookMongo {
  id: string;

  @Prop()
  authorId: string;

  @Prop()
  translatorId: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  isbn: number;

  @Prop()
  total_page: number;

  @Prop()
  book_size: string;

  @Prop()
  publication_date: string;

  @Prop()
  publisher: string;

  @Prop()
  stock: number;

  @Prop()
  status: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' } })
  author: Author;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Tranlator' } })
  translator: Tranlator;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Like' } })
  like: Like[];

  @Prop()
  total_like: number;

  @Prop()
  genre: string;
}

export const BookSchema = SchemaFactory.createForClass(BookMongo);

/********************************
 ************* GRAPHQL***********
 ********************************/

// ENUM
export enum BookGenre {
  FICTION = 'FICTION',
  FINANCE = 'FINANCE',
  HUMANITIES = 'HUMANITIES',
}

export enum BookStatus {
  SALE = 'SALE',
  SOLD_OUT = 'SOLD_OUT',
  READY = 'READY',
}

registerEnumType(BookGenre, { name: 'BookGenre' });
registerEnumType(BookStatus, { name: 'BookStatus' });

// TYPE
@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  authorId: string;

  @Field(() => ID, { nullable: true })
  translatorId: string;

  @Field()
  title: string;

  @Field(() => Int)
  price: number;

  @Field(() => Float, { nullable: true })
  isbn: number;

  @Field(() => Float, { nullable: true })
  total_page: number;

  @Field({ nullable: true })
  book_size: string;

  @Field({ nullable: true })
  publication_date: string;

  @Field({ nullable: true })
  publisher: string;

  @Field(() => Int)
  stock: number;

  @Field(() => BookStatus)
  status: BookStatus;

  @Field(() => Author, { nullable: true })
  author: Author;

  @Field(() => Tranlator, { nullable: true })
  translator: Tranlator;

  @Field(() => [Like], { nullable: 'itemsAndList' })
  like: Like[];

  @Field(() => Int)
  total_like: number;

  @Field(() => BookGenre)
  genre: BookGenre;
}

@InputType()
export class BookInputType {
  @Field(() => ID)
  authorId: string;

  @Field(() => ID, { nullable: true })
  translatorId: string;

  @Field()
  title: string;

  @Field(() => Int)
  price: number;

  @Field(() => Float, { nullable: true })
  isbn: number;

  @Field(() => Float, { nullable: true })
  total_page: number;

  @Field({ nullable: true })
  book_size: string;

  @Field({ nullable: true })
  publication_date: string;

  @Field({ nullable: true })
  publisher: string;

  @Field(() => Int)
  stock: number;

  @Field(() => BookStatus)
  status: BookStatus;

  @Field(() => BookGenre)
  genre: BookGenre;
}

@ArgsType()
@InputType()
export class UpdateBookType {
  @Field(() => Int, { nullable: true })
  price: number;

  @Field(() => Int, { nullable: true })
  stock: number;

  @Field(() => BookStatus, { nullable: true })
  status: BookStatus;
}
