import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ResolveReference,
  Int,
} from '@nestjs/graphql';
import { RoleService } from '../roles/role.service';
import { CreateRoleInput, CreateRolesInput } from './dto/create.role';
import { UpdateRoleInput } from './dto/update.role';
import { Role } from './role.entity';
import { UserRoles } from './enum/role';
import { User } from '../users/user.entity';
import { RolePage } from './dto/rolePage.dto';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @ResolveField(() => [User], { nullable: true })
  async users(@Parent() role: Role): Promise<User[] | null> {
    return role.users ?? null;
  }

  @Query(() => Role, { name: 'roleById' })
  async getRoleById(@Args('id') id: string): Promise<Role> {
    try {
      const role = await this.roleService.findRoleById(id);
      if (!role) {
        throw new Error(`Role with ID ${id} not found`);
      }
      return role;
    } catch (error: any) {
      throw new Error(`Error fetching role: ${error.message}`);
    }
  }

  @Query(() => Role, { name: 'roleByRoleName' })
  async getRoleByRoleName(
    @Args('roleName', { type: () => UserRoles }) roleName: UserRoles,
  ): Promise<Role> {
    try {
      const role = await this.roleService.findRoleByRolename(roleName);
      if (!role) {
        throw new Error(`Role with roleName ${roleName} not found`);
      }
      return role;
    } catch (error: any) {
      throw new Error(`Error fetching role: ${error.message}`);
    }
  }

  @Query(() => RolePage, { name: 'users' })
  async getUsers(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<RolePage> {
    try {
      const skip = (page - 1) * pageSize;
      const roles = await this.roleService.findAllRoles(skip, pageSize);
      const rolePage: RolePage = { data: roles, totalItems: roles.length };
      return rolePage;
    } catch (error: any) {
      throw new Error(`Error fetching roles: ${error.message}`);
    }
  }

  @Mutation(() => Role, { name: 'createRole' })
  async createRole(@Args('input') input: CreateRoleInput): Promise<Role> {
    try {
      return await this.roleService.createRole(input);
    } catch (error: any) {
      throw new Error(`Error creating role: ${error.message}`);
    }
  }

  @Mutation(() => [Role], { name: 'createRoles' })
  async createRoles(@Args('inputs') input: CreateRolesInput): Promise<Role[]> {
    try {
      const roles: Role[] = await Promise.all(
        input.roles.map(async (roleData) => {
          const createdRole = await this.roleService.createRole(roleData);
          return createdRole;
        }),
      );
      return roles;
    } catch (error: any) {
      throw new Error(`Error creating roles: ${error.message}`);
    }
  }

  @Mutation(() => Role, { name: 'updateRole' })
  async updateRole(
    @Args('id') id: string,
    @Args('input') input: UpdateRoleInput,
  ): Promise<Role | null> {
    try {
      return await this.roleService.updateRole(id, input);
    } catch (error: any) {
      throw new Error(`Error updating role: ${error.message}`);
    }
  }

  @Mutation(() => Role, { name: 'deleteRole' })
  async deleteRole(@Args('id') id: string): Promise<Role | null> {
    try {
      return await this.roleService.deleteRole(id);
    } catch (error: any) {
      throw new Error(`Error deleting role: ${error.message}`);
    }
  }

  /**
   * required by graphql federation
   */
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.roleService.findRoleById(reference.id);
  }
}
