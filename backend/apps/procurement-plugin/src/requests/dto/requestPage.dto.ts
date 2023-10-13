import { PaginateResult } from '@libs/core/entities/dto/paginateResult.dto';
import { ObjectType } from '@nestjs/graphql';
import { Request } from '../request.entity';

@ObjectType()
export class RequestPage extends PaginateResult(Request) {}
