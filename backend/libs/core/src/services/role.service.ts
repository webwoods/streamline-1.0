import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/role.entity';
import { Repository } from 'typeorm';
import { UserRoles } from '../entities/enum/role';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(input: Partial<Role>): Promise<Role> {
    const role = this.roleRepository.create(input);
    return await this.roleRepository.save(role);
  }

  async findAllRoles(skip: number, take: number): Promise<Role[]> {
    const data = await this.roleRepository.find({
      skip,
      take,
      relations: { users: true },
    });
    return data;
  }

  async findRoleById(id: string): Promise<Role | null> {
    return await this.roleRepository.findOne({
      relations: { users: true },
      where: { id },
    });
  }

  async findRolesByDivision(division: string): Promise<Role[]> {
    return await this.roleRepository.find({
      relations: { users: true },
      where: { division },
    });
  }

  async findRoleByRolename(name: UserRoles): Promise<Role | null> {
    return await this.roleRepository.findOne({
      relations: { users: true },
      where: { name },
    });
  }

  async updateRole(id: string, input: Partial<Role>): Promise<Role | null> {
    await this.roleRepository.update(id, input);
    return await this.roleRepository.findOne({
      relations: { users: true },
      where: { id },
    });
  }

  async deleteRole(id: string): Promise<Role | null> {
    const role = await this.roleRepository.findOne({
      relations: { users: true },
      where: { id },
    });
    await this.roleRepository.delete(id);
    return role;
  }
}
