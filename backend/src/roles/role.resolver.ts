import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { RoleService } from 'src/roles/role.service';
import { CreateRoleInput, CreateRolesInput } from './dto/create.role';
import { UpdateRoleInput } from './dto/update.role';
import { Role } from './role.entity';
import { UserRoles } from './enum/role';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => Role, { name: 'roleById' })
  async getRoleById(@Args('id') id: string): Promise<Role> {
    return this.roleService.findRoleById(id);
  }

  @Query(() => Role, { name: 'roleByRoleName' })
  async getRoleByRoleName(
    @Args('roleName') roleName: UserRoles,
  ): Promise<Role> {
    return this.roleService.findRoleByRolename(roleName);
  }

  @Query(() => [Role], { name: 'roles' })
  async getRoles(): Promise<Role[]> {
    return this.roleService.findAllRoles();
  }

  @Mutation(() => Role, { name: 'createRole' })
  async createRole(@Args('input') input: CreateRoleInput): Promise<Role> {
    return this.roleService.createRole(input);
  }

  @Mutation(() => [Role], { name: 'createRoles' })
  async createRoles(@Args('inputs') input: CreateRolesInput): Promise<Role[]> {
    const roles: Role[] = [];

    // Use `Promise.all` to run multiple asynchronous operations concurrently
    await Promise.all(
      input.roles.map(async (roleData) => {
        const createdRole = await this.roleService.createRole(roleData);
        roles.push(createdRole); // Push the created role into the roles array
      }),
    );

    return roles;
  }

  @Mutation(() => Role, { name: 'updateRole' })
  async updateRole(
    @Args('id') id: string,
    @Args('input') input: UpdateRoleInput,
  ): Promise<Role> {
    return this.roleService.updateRole(id, input);
  }

  @Mutation(() => Role, { name: 'deleteRole' })
  async deleteRole(@Args('id') id: string): Promise<Role> {
    return this.roleService.deleteRole(id);
  }
}
