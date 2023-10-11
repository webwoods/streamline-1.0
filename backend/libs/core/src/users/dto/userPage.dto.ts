import { User } from '@libs/core/users/user.entity';
import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from '../../entities/dto/paginateResult.dto';

@ObjectType()
export class UserPage extends PaginateResult(User) {}