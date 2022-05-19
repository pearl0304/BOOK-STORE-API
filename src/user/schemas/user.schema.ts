import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import {
  Field,
  ObjectType,
  ID,
  InputType,
  Int,
  ArgsType,
} from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

export type UserDocument = UserMongo & Document;

@Schema()
export class UserMongo {
  id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  nick: string;

  // TODO :: Cypo
  @Prop()
  password: string;

  @Prop()
  address1: string;

  @Prop()
  address2: string;

  @Prop()
  zip_code: string;

  @Prop()
  preferred_genre: string;

  @Prop({ type: Date })
  created_date: Date;

  @Prop({ type: Date })
  update_date: Date;

  @Prop({ type: Date })
  delete_date: Date;

  @Prop()
  is_delete: boolean;

  @Prop()
  point: number;
}
export const UserSchema = SchemaFactory.createForClass(UserMongo);

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  nick: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  address1: string;

  @Field({ nullable: true })
  address2: string;

  @Field({ nullable: true })
  zip_code: string;

  @Field({ nullable: true })
  preferred_genre: string;

  @Field(() => String, { nullable: true })
  created_date: Date;

  @Field(() => String, { nullable: true })
  update_date: Date;

  @Field(() => String, { nullable: true })
  delete_date: Date;

  @Field({ nullable: true })
  is_delete: boolean;

  @Field(() => Int, { nullable: true })
  point: number;
}

@ArgsType()
@InputType()
export class UserInputType {
  // TODO :: VALIDATION NICKNAME LENTH AND FORMAT EMAIL
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @Length(2, 8)
  @Field()
  nick: string;

  @Length(8, 12)
  @Field()
  password: string;

  @Field({ nullable: true })
  address1: string;

  @Field({ nullable: true })
  address2: string;

  @Field({ nullable: true })
  zip_code: string;

  @Field({ nullable: true })
  preferred_genre: string;
}
