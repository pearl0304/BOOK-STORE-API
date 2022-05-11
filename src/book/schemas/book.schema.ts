import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Field, Int, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Author } from '../../author/schemas/author.schema';

export type BookDocument = Book & Document;

@Schema()
@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;

  @Prop()
  @Field()
  title: string;

  @Prop()
  @Field(() => Int, { nullable: true })
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
}

@InputType()
export class CrateBookInput {
  @Field()
  title: string;

  @Field(() => Int, { nullable: true })
  isbn: number;

  @Field({ nullable: true })
  publication_date: string;

  @Field({ nullable: true })
  publisher: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
