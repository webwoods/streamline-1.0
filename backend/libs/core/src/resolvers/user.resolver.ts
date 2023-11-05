import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserInput, CreateUsersInput } from '../entities/dto/create.user';
import { UpdateUserInput } from '../entities/dto/update.user';
import { Role } from '../entities/role.entity';
import { UserPage } from '../entities/dto/userPage.dto';
import { AuthGuard } from '../guards/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => Role, { nullable: true })
  async role(@Parent() user: User): Promise<Role | null> {
    return user.role ?? null;
  }

  @Query(() => User, { name: 'user' })
  async getUserById(@Args('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  @Query(() => UserPage, { name: 'users' })
  async getUsers(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<UserPage> {
    try {
      const skip = (page - 1) * pageSize;
      const users = await this.userService.findAllUsers(skip, pageSize);
      const userPage: UserPage = { data: users, totalItems: users.length };
      return userPage;
    } catch (error: any) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<User | null> {
    try {
      return await this.userService.createUser(input);
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => [User], { name: 'createUsers' })
  async createUsers(
    @Args('inputs') input: CreateUsersInput,
  ): Promise<(User | null)[]> {
    try {
      const users: (User | null)[] = await Promise.all(
        input.users.map(async (userData) => {
          const createdUser = await this.userService.createUser(userData);
          return createdUser;
        }),
      );
      return users;
    } catch (error: any) {
      throw new Error(`Error creating users: ${error.message}`);
    }
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User | null> {
    try {
      return await this.userService.updateUser(id, input);
    } catch (error: any) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string): Promise<User | null> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error: any) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  /**
   * required by graphql federation
   */
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.userService.findUserById(reference.id);
  }
}
