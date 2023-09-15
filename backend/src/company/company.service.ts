import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { UserService } from 'src/user/user.service';
import { StallService } from 'src/stall/stall.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private userService: UserService,
    private stallService: StallService,
  ) {}

  async createCompany(input: Partial<Company>): Promise<Company> {
    const user = await this.userService.findUserById(input.userId);

    if (!user) {
      throw new Error('User not found!');
    }

    const newCompany = new Company();

    newCompany.companyName = input.companyName;
    newCompany.userId = input.userId;
    newCompany.user = user;

    const company = this.companyRepository.create(newCompany);
    return await this.companyRepository.save(company);
  }

  async findAllCompanies(): Promise<Company[]> {
    const companies = await this.companyRepository.find();

    // Use Promise.all to fetch users for all companies concurrently
    const populatedCompanies = await Promise.all(
      companies.map(async (company) => {
        const user = await this.userService.findUserById(company.userId);
        if (user) {
          // If user exists, associate it with the company
          company.user = user;
        }
        return company;
      }),
    );

    return populatedCompanies;
  }

  async findCompanyById(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (company) {
      // If the company exists, fetch and associate the user
      const user = await this.userService.findUserById(company.userId);
      if (user) {
        company.user = user;
      }
    }

    return company || null; // Return the company or null if not found
  }

  async updateCompany(id: string, input: Partial<Company>): Promise<Company> {
    await this.companyRepository.update(id, input);
    return await this.companyRepository.findOne({ where: { id } });
  }

  async deleteCompany(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    await this.companyRepository.delete(id);
    return company;
  }
}
