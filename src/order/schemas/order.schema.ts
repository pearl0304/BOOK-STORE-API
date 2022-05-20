import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Date, Document } from 'mongoose';
import {
  Field,
  ObjectType,
  ID,
  Int,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { Book } from 'src/book/schemas/book.schema';
import { User } from 'src/user/schemas/user.schema';

export type OrderDocument = Order & Document;

@Schema()
export class OrderMongo {
  id: string;

  @Prop()
  finalId: string;

  @Prop()
  userId: string;

  @Prop()
  bookId: string;

  @Prop()
  sale_price: number;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  user: User;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' } })
  book: Book[];

  @Prop({ type: Date })
  created_date: Date;

  @Prop()
  status: string;

  @Prop()
  total_price: number;
}

export const OrderSchema = SchemaFactory.createForClass(OrderMongo);

/********************************
 ************* GRAPHQL***********
 ********************************/

export enum OrderStatus {
  PENDING = 'PENDING',
  READY = 'READY',
  DELIVERY = 'DELIVERY',
  RETURN = 'RETURN',
  DONE = 'DONE',
}
registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  finalId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  bookId: string;

  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => Book, { nullable: true })
  book: Book;

  @Field(() => String, { nullable: true })
  created_date: Date;

  @Field(() => OrderStatus)
  status: string;
}

@ObjectType()
export class OrderResult {
  @Field(() => [Order], { nullable: 'itemsAndList' })
  list: string[];

  @Field(() => Int)
  total_price: number;

  @Field(() => Int)
  total_count: number;
}

@InputType()
export class CreateOrderListInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  bookId: string;

  @Field(() => Int)
  sale_price: number;
}
