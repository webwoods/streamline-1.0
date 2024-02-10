import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { Request } from '../request.entity';

@ObjectType()
export class RequestPage extends PaginateResult(Request) {}
