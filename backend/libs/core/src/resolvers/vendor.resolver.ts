import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { VendorService } from '../services/vendor.service';
import { Vendor } from '../entities/vendor.entity';
import { VendorPage } from '../entities/dto/vendor-page.dto';
import { UpdateVendorInput } from '../entities/dto/update.vendor';
import { CreateVendorInput } from '../entities/dto/create.vendor';

@Resolver(() => Vendor)
export class VendorResolver {
  constructor(private readonly vendorService: VendorService) {}

  @Query(() => Vendor, { name: 'vendor' })
  async getVendorById(@Args('id') id: string): Promise<Vendor> {
    try {
      const vendor = await this.vendorService.findVendorById(id);
      if (!vendor) {
        throw new Error(`Vendor with ID ${id} not found`);
      }
      return vendor;
    } catch (error: any) {
      throw new Error(`Error fetching vendor: ${error.message}`);
    }
  }

  @Query(() => Vendor, { name: 'vendorByNameOrEmail' })
  async getVendorBynameOrEmail(
    @Args('name', { nullable: true }) name: string,
    @Args('email', { nullable: true }) email: string,
  ): Promise<Vendor> {
    try {
      const vendor = name
        ? await this.vendorService.findVendorByName(name)
        : await this.vendorService.findVendorByEmail(email);
      if (!vendor) {
        if (name) {
          throw new Error(`Vendor with name ${name} not found`);
        } else {
          throw new Error(`Vendor with email ${email} not found`);
        }
      }
      return vendor;
    } catch (error: any) {
      throw new Error(`Error fetching vendor: ${error.message}`);
    }
  }

  @Query(() => VendorPage, { name: 'vendors' })
  async getVendors(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<VendorPage> {
    try {
      const skip = (page - 1) * pageSize;
      const vendors = await this.vendorService.findAllVendors(skip, pageSize);
      const vendorPage: VendorPage = { data: vendors, totalItems: vendors.length };
      return vendorPage;
    } catch (error: any) {
      throw new Error(`Error fetching vendors: ${error.message}`);
    }
  }

  @Mutation(() => Vendor, { name: 'createVendor' })
  async createVendor(@Args('input') input: CreateVendorInput): Promise<Vendor | null> {
    try {
      return await this.vendorService.createVendor(input);
    } catch (error: any) {
      throw new Error(`Error creating vendor: ${error.message}`);
    }
  }


  @Mutation(() => Vendor, { name: 'updateVendor' })
  async updateVendor(
    @Args('id') id: string,
    @Args('input') input: UpdateVendorInput,
  ): Promise<Vendor | null> {
    try {
      return await this.vendorService.updateVendor(id, input);
    } catch (error: any) {
      throw new Error(`Error updating vendor: ${error.message}`);
    }
  }

  @Mutation(() => Vendor, { name: 'deleteVendor' })
  async deleteVendor(@Args('id') id: string): Promise<Vendor | null> {
    try {
      return await this.vendorService.deleteVendor(id);
    } catch (error: any) {
      throw new Error(`Error deleting vendor: ${error.message}`);
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
