import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { Field, ObjectType, ID, InputType, Int } from '@nestjs/graphql';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Prop()
  @Field({ nullable: true })
  name: string;

  @Prop()
  @Field({ nullable: true })
  email: string;

  @Prop()
  @Field({ nullable: true })
  nick: string;

  @Prop()
  @Field({ nullable: true })
  // TODO: CYPO
  password: string;

  @Prop()
  @Field({ nullable: true })
  address: string;

  @Prop()
  @Field({ nullable: true })
  preferred_genre: string;

  @Prop({ type: Date })
  @Field(() => String, { nullable: true })
  created_date: Date;

  @Prop({ type: Date })
  @Field(() => String, { nullable: true })
  update_date: Date;

  @Prop({ type: Date })
  @Field(() => String, { nullable: true })
  delete_date: Date;

  @Prop()
  @Field({ nullable: true })
  is_delete: boolean;

  @Prop()
  @Field(() => Int)
  point: number;
}

@InputType()
export class CreateUserInput {
  // TODO :: VALIDATION NICKNAME LENTH AND FORMAT EMAIL
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  nick: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  preferred_genre: string;
}

@InputType()
export class UpdateUserInput {
  // TODO :: VALIDATION NICKNAME LENTH
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  nick: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  preferred_genre: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
