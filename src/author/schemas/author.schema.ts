import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Book } from 'src/book/schemas/book.schema';

export type AuthorDocument = Author & Document;

@Schema()
@ObjectType()
export class Author {
  @Field(() => ID)
  id: string;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  title: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' } })
  @Field(() => [Book], { nullable: 'itemsAndList' })
  book: Book[];
}

@InputType()
export class CreateAuthorInput {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  name: string;
}
export const AuthorSchema = SchemaFactory.createForClass(Author);
