import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../entities/vendor.entity';
import { Region } from '../entities/enum/region';
@Injectable()
export class VendorService {

  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) { }

  async findAllVendors(skip: number, take: number, region?: Region): Promise<Vendor[]> {
    const data = await this.vendorRepository.find({
      skip,
      take,
      where: {
        region: region
      }
    });
    return data;
  }

  async findVendorById(id: string): Promise<Vendor | null> {
    return await this.vendorRepository.findOne({
      where: { id },
    });
  }

  async findVendorByName(name: string): Promise<Vendor | null> {
    return await this.vendorRepository.findOne({
      where: { name },
    });
  }

  async findVendorByEmail(email: string): Promise<Vendor | null> {
    return await this.vendorRepository.findOne({
      where: { email },
    });
  }

  async createVendor(input: Partial<Vendor>): Promise<Vendor | null> {
    const vendor = this.vendorRepository.create(input);
    const createdVendor = await this.vendorRepository.save(vendor);
    return await this.vendorRepository.findOne({
      where: { id: createdVendor.id },
    });
  }

  async updateVendor(id: string, input: Partial<Vendor>): Promise<Vendor | null> {
    const vendor = await this.vendorRepository.findOne({
      where: { id },
    });

    // If the vendor doesn't exist, throw NotFoundException
    if (!vendor) {
      throw new NotFoundException(`Vendor with id ${id} not found`);
    }

    Object.assign(vendor, input);

    // Construct the set object dynamically based on input values
    await this.vendorRepository.save(vendor);
    return await this.findVendorById(id);
  }

  async deleteVendor(id: string): Promise<Vendor | null> {
    const vendor = await this.vendorRepository.findOne({

      where: { id },
    });
    await this.vendorRepository.delete(id);
    return vendor;
  }
}
