import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import {
  Field,
  ObjectType,
  ID,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { User } from 'src/user/schemas/user.schema';
import { Book } from 'src/book/schemas/book.schema';

export type LikeDocument = Like & Document;

@Schema()
export class LikeMongo {
  id: string;

  @Prop()
  userId: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  user: User;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' } })
  book: Book;

  @Prop()
  bookId: string;

  @Prop()
  action: string;
}
export const LikeSchema = SchemaFactory.createForClass(LikeMongo);

export enum ActionType {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

registerEnumType(ActionType, {
  name: 'ActionType',
});

@ObjectType()
export class Like {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  bookId: string;

  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => Book, { nullable: true })
  book: Book;

  @Field(() => ActionType)
  action: ActionType;
}

@InputType()
export class CreateLikeInput {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  bookId: string;

  @Field(() => ActionType)
  action: ActionType;
}
