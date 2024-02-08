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
import { UserPage as VendorPage } from '../entities/dto/user-page.dto';
import { AuthGuard } from '../guards/auth.guard';
import { VendorService } from '../services/vendor.service';
import { Vendor } from '../entities/vendor.entity';

@Resolver(() => Vendor)
export class VendorResolver {
  constructor(private readonly vendorService: VendorService) {}

  @ResolveField(() => Role, { nullable: true })
  async role(@Parent() user: User): Promise<Role | null> {
    return user.role ?? null;
  }

  @Query(() => Vendor, { name: 'vendor' })
  async getUserById(@Args('id') id: string): Promise<Vendor> {
    try {
      const vendor = await this.vendorService.findVendorById(id);
      if (!vendor) {
        throw new Error(`User with ID ${id} not found`);
      }
      return vendor;
    } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  @Query(() => Vendor, { name: 'userByNameOrEmail' })
  async getUserByUsername(
    @Args('name', { nullable: true }) name: string,
    @Args('email', { nullable: true }) email: string,
  ): Promise<Vendor> {
    try {
      const vendor = name
        ? await this.vendorService.findVendorByName(name)
        : await this.vendorService.findVendorByEmail(email);
      if (!vendor) {
        if (name) {
          throw new Error(`User with username ${name} not found`);
        } else {
          throw new Error(`User with email ${email} not found`);
        }
      }
      return vendor;
    } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  @Query(() => VendorPage, { name: 'vendor' })
  async getUsers(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<VendorPage> {
    try {
      const skip = (page - 1) * pageSize;
      const vendors = await this.vendorService.findAllVendors(skip, pageSize);
      const vendorPage: VendorPage = { data: vendors, totalItems: vendors.length };
      return vendorPage;
    } catch (error: any) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  @Mutation(() => Vendor, { name: 'updateVendor' })
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<Vendor | null> {
    try {
      return await this.vendorService.updateVendor(id, input);
    } catch (error: any) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  @Mutation(() => Vendor, { name: 'deleteVendor' })
  async deleteUser(@Args('id') id: string): Promise<Vendor | null> {
    try {
      return await this.vendorService.deleteVendor(id);
    } catch (error: any) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  /**
   * required by graphql federation
   */
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.vendorService.findVendorById(reference.id);
  }
}
