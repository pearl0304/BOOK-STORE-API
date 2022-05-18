import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Field, Int, ObjectType, ID, InputType } from '@nestjs/graphql';
import { User } from 'src/user/schemas/user.schema';
import { Book } from 'src/book/schemas/book.schema';

export type LikeDocument = Like & Document;

@Schema()
@ObjectType()
export class Like {
  @Prop()
  @Field(() => ID)
  id: string;

  @Prop()
  @Field(() => ID)
  userId: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  @Field(() => User)
  user: User;

  @Prop()
  @Field(() => ID)
  bookId: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' } })
  @Field(() => ID)
  book: Book[];

  @Prop()
  @Field()
  action: string;
}

@InputType()
export class CreateLikeInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => User)
  user: User;

  @Field(() => ID)
  bookId: string;

  @Field(() => ID)
  book: Book[];

  @Field()
  action: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
