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
import { Order } from 'src/order/schemas/order.schema';

export type BuyDocument = Buy & Document;

@Schema()
export class BuyMongo {
  id: string;

  @Prop()
  userId: string;

  @Prop()
  orderIds: string[];

  @Prop()
  total_price: number;

  @Prop()
  receiver: string;

  @Prop()
  sender: string;

  @Prop()
  address1: string;

  @Prop()
  address2: string;

  @Prop()
  zip_code: string;

  @Prop()
  payment_status: string;

  @Prop({ type: Date })
  created_date: Date;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' } })
  order: Order;
}

export const BuySchema = SchemaFactory.createForClass(BuyMongo);

/********************************
 ************* GRAPHQL***********
 ********************************/
export enum PaymentStatus {
  BEFORE_PAYMENT = 'BEFORE_PAYMENT',
  COMPLETE = 'COMPLETE',
  REFUND = 'REFUND',
}
registerEnumType(PaymentStatus, {
  name: 'PaymentStatus',
});

@ObjectType()
export class Buy {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => [ID], { nullable: true })
  orderIds: string[];

  @Field(() => [Order], { nullable: true })
  order: Order[];

  @Field(() => Int)
  total_price: number;

  @Field()
  receiver: string;

  @Field()
  sender: string;

  @Field(() => String)
  address1: string;

  @Field(() => String, { nullable: true })
  address2: string;

  @Field(() => String)
  zip_code: string;

  @Field(() => PaymentStatus)
  payment_status: PaymentStatus;

  @Field(() => String)
  created_date: Date;
}

@InputType()
export class BuyInputType {
  @Field(() => ID)
  userId: string;

  @Field(() => [ID], { nullable: true })
  orderIds: string[];

  @Field(() => Int)
  total_price: number;

  @Field()
  receiver: string;

  @Field()
  sender: string;

  @Field(() => String)
  address1: string;

  @Field(() => String, { nullable: true })
  address2: string;

  @Field(() => String)
  zip_code: string;

  @Field(() => PaymentStatus)
  payment_status: PaymentStatus;
}
