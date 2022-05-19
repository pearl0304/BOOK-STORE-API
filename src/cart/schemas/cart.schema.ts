import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { User } from 'src/user/schemas/user.schema';
import { Book } from 'src/book/schemas/book.schema';
import { ActionType } from 'src/like/schemas/like.schema';

export type CartDocument = Cart & Document;

@Schema()
export class CartMongo {
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
export const CartSchema = SchemaFactory.createForClass(CartMongo);

@ObjectType()
export class Cart {
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
export class CreateCartInput {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  bookId: string;

  @Field(() => ActionType)
  action: ActionType;
}
