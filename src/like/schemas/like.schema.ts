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
  @Field(() => ID, { nullable: true })
  id: string;

  @Prop()
  @Field(() => ID)
  userId: string;

  @Prop()
  @Field(() => ID)
  bookId: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  @Field(() => User, { nullable: true })
  user: User;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' } })
  @Field(() => [Book], { nullable: 'itemsAndList' })
  book: Book[];

  @Prop()
  @Field()
  action: string;
}

@InputType()
export class CreateLikeInput {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  bookId: string;

  @Field()
  action: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
