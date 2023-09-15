import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { UpdateCompanyInput } from './dto/update.company';
import { CreateCompanyInput } from './dto/create.company';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Company], { name: 'companies' })
  async findAllCompanies(): Promise<Company[]> {
    return this.companyService.findAllCompanies();
  }

  @Query(() => Company, { name: 'company' })
  async findCompanyById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Company> {
    return this.companyService.findCompanyById(id);
  }

  @Mutation(() => Company, { name: 'createCompany' })
  async createCompany(
    @Args('input') input: CreateCompanyInput,
  ): Promise<Company> {
    return this.companyService.createCompany(input);
  }

  @Mutation(() => Company, { name: 'updateCompany' })
  async updateCompany(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateCompanyInput,
  ): Promise<Company> {
    return this.companyService.updateCompany(id, input);
  }

  @Mutation(() => Company, { name: 'deleteCompany' })
  async deleteCompany(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Company> {
    return this.companyService.deleteCompany(id);
  }
}
