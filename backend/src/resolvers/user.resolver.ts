import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserInput } from '../dto/create.user';
import { UpdateUserInput } from '../dto/update.user';
import { Role } from 'src/models/role.entity';
import { RoleService } from 'src/services/role.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

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
    const users = await this.userService.findAllUsers();
    const usersWithRoles: User[] = [];
    await Promise.all(
      users.map(async (user) => {
        const role = await this.roleService.findRoleById(user.roleId);
        user.role = role;
        usersWithRoles.push(user);
      }),
    );

    return usersWithRoles;
  }

  @Query(() => [User], { name: 'usersByRole' })
  async getUsersByRoleId(@Args('roleId') roleId: string): Promise<User[]> {
    const users = await this.userService.findUsersByRoleId(roleId);
    const usersWithRoles: User[] = [];
    const role = await this.roleService.findRoleById(roleId);
    await Promise.all(
      users.map(async (user) => {
        user.role = role;
        usersWithRoles.push(user);
      }),
    );
    return usersWithRoles;
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const user = new User();
    user.name = input?.name;
    user.password = input?.password;
    user.email = input?.email;
    user.username = input?.username;
    if (input.roleId) {
      const role = await this.roleService.findRoleById(input.roleId);
      user.roleId = input.roleId;
      user.role = role;
    }
    return this.userService.createUser(user);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    const user = await this.getUserById(id);
    if (input.roleId) {
      const role = await this.roleService.findRoleById(input.roleId);
      user.roleId = input.roleId;
      user.role = role;
    }
    return this.userService.updateUser(id, user);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
