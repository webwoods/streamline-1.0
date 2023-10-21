import { PaginateResult } from './paginateResult.dto';
import { ObjectType } from '@nestjs/graphql';
import { RequestItem } from '../request-items.entity';

@ObjectType()
export class RequestItemPage extends PaginateResult(RequestItem) {}
