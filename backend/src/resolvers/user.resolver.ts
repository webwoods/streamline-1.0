import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserInput } from '../dto/create.user';
import { UpdateUserInput } from '../dto/update.user';
import { Role } from 'src/models/role.entity';
import { RoleService } from 'src/services/role.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly roleService: RoleService) {}

  @ResolveField(() => Role, { nullable: true })
  async role(@Parent() user: User): Promise<Role | null> {
    return user.role || null;
  }

  @Query(() => User, { name: 'user' })
  async getUserById(@Args('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(input);
    if (input.roleId) {
      const role = await this.roleService.findRoleById(input.roleId);
      user.role = role;
    }
    return user;
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
