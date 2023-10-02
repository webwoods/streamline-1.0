import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { UserService } from './user.service';
import { CreateUserInput, CreateUsersInput } from '../users/dto/create.user';
import { UpdateUserInput } from '../users/dto/update.user';
import { Role } from 'src/roles/role.entity';
import { UsersWithCount } from 'src/users/dto/read.user';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => Role, { nullable: true })
  async role(@Parent() user: User): Promise<Role | null> {
    return user.role || null;
  }

  @Query(() => User, { name: 'user' })
  async getUserById(@Args('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  @Query(() => UsersWithCount, { name: 'users' })
  async getUsers(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<UsersWithCount> {
    try {
      const skip = (page - 1) * pageSize;
      const [data, _] = await this.userService.findAllUsers(skip, pageSize); // data is queried as [User[], number]
      return { data, totalItems: data.length }
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    try {
      return await this.userService.createUser(input);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  @Mutation(() => [User], { name: 'createUsers' })
  async createUsers(@Args('inputs') input: CreateUsersInput): Promise<User[]> {
    try {
      const users: User[] = await Promise.all(
        input.users.map(async (userData) => {
          const createdUser = await this.userService.createUser(userData);
          return createdUser;
        }),
      );
      return users;
    } catch (error) {
      throw new Error(`Error creating users: ${error.message}`);
    }
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    try {
      return await this.userService.updateUser(id, input);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string): Promise<User> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}
