import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import {
  Field,
  Int,
  ObjectType,
  ID,
  InputType,
  registerEnumType,
  Float,
} from '@nestjs/graphql';
import { Author } from '../../author/schemas/author.schema';

export type BookDocument = Book & Document;

export enum BookGenre {
  FANDASY,
  FICTION,
  SCIENCE_FICTION,
  REALISTIC_FOCTION,
  HISTORICAL_FICTION,
  MYSTERY,
  INFORMATIONAL,
  BIOGRAPHY,
  AUTHOBIOGRAPHY,
  POETRY,
  HUMANITIES,
  STUDY,
}
registerEnumType(BookGenre, {
  name: 'BookGenre',
});

@Schema()
@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;

  @Prop()
  @Field(() => ID)
  authorId: string;

  @Prop()
  @Field()
  title: string;

  @Prop()
  @Field(() => Int)
  price: number;

  @Prop()
  @Field(() => Float, { nullable: true })
  isbn: number;

  @Prop()
  @Field({ nullable: true })
  publication_date: string;

  @Prop()
  @Field({ nullable: true })
  publisher: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' } })
  @Field(() => [Author], { nullable: 'itemsAndList' })
  author: Author[];

  // @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Like' } })
  // @Field(() => [Author], { nullable: 'itemsAndList' })
  // author: Like[];
}

@InputType()
export class CreateBookInput {
  @Field(() => ID)
  authorId: string;

  @Field()
  title: string;

  @Field(() => Int)
  price: number;

  @Field(() => Float, { nullable: true })
  isbn: number;

  @Field({ nullable: true })
  publication_date: string;

  @Field({ nullable: true })
  publisher: string;

  @Field(() => BookGenre, { nullable: true })
  genre: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
