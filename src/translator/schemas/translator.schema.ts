import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Book } from 'src/book/schemas/book.schema';

export type TranslatorDocument = TranlatorMongo & Document;

@Schema()
export class TranlatorMongo {
  id: string;

  @Prop()
  name: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' } })
  book: Book[];
}
export const TranlatorSchema = SchemaFactory.createForClass(TranlatorMongo);

@ObjectType()
export class Tranlator {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Book], { nullable: 'itemsAndList' })
  book: Book[];
}

@InputType()
export class CreateTranlatorInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  nationality: string;
}
