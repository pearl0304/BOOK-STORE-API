import {
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  ID,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserInputType } from './schemas/user.schema';
import { ApolloError } from 'apollo-server-express';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { nullable: 'itemsAndList' })
  async findAllUsers() {
    try {
      return this.userService.findAllUsers();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Query(() => User)
  async findUserById(@Args('id', { type: () => ID }) id: string) {
    try {
      return this.userService.findUserById(id);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => User)
  async createUser(@Args('input') user: UserInputType) {
    try {
      return this.userService.createUser(user);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => User)
  async updateUserInfo(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') user: UserInputType,
  ) {
    try {
      return this.userService.updateUserInfo(id, user);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Mutation(() => ID)
  async deleteUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => ID)
  async deleteUserByAdmin(@Args('id', { type: () => ID }) id: string) {
    return this.userService.deleteUserByAdmin(id);
  }
}
