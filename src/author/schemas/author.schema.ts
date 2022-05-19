import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Book } from 'src/book/schemas/book.schema';

export type AuthorDocument = Author & Document;

@Schema()
export class AuthorMongo {
  id: string;

  @Prop()
  name: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' } })
  book: Book[];
}

@ObjectType()
export class Author {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Book], { nullable: 'itemsAndList' })
  book: Book[];
}

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  nationality: string;
}
export const AuthorSchema = SchemaFactory.createForClass(AuthorMongo);
