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

export enum OrderStatus {
  PENDING,
  READY,
  DELIVERY,
  DONE,
}
registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

@Schema()
@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Prop()
  @Field(() => ID)
  userId: string;

  @Prop()
  @Field(() => ID)
  bookId: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  @Field(() => User, { nullable: true })
  user: User[];

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' } })
  @Field(() => [Book], { nullable: 'itemsAndList' })
  book: Book[];

  @Prop({ type: Date })
  @Field(() => String, { nullable: true })
  created_date: Date;

  @Prop()
  @Field(() => OrderStatus)
  status: string;

  @Prop()
  @Field(() => Int)
  total_price: number;
}

export class CrateOrderInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  bookId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
