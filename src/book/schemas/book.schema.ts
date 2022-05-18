import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Field, Int, ObjectType, ID, InputType, Float } from '@nestjs/graphql';
import { Author } from '../../author/schemas/author.schema';

export type BookDocument = Book & Document;

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

  @Prop()
  @Field(() => Int)
  stock: number;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' } })
  @Field(() => Author, { nullable: true })
  author: Author;

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

  @Field(() => String, { nullable: true })
  genre: string;

  @Prop()
  @Field(() => Int, { nullable: true })
  stock: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
