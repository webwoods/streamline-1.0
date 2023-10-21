import { PaginateResult } from './paginateResult.dto';
import { ObjectType } from '@nestjs/graphql';
import { Request } from '../request.entity';

@ObjectType()
export class RequestPage extends PaginateResult(Request) {}
