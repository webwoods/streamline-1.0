import { Role } from '@libs/core/roles/role.entity';
import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from '../../entities/dto/paginateResult.dto';

@ObjectType()
export class RolePage extends PaginateResult(Role) {}