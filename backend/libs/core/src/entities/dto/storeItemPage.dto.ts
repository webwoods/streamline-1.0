import { StoreItem } from '../storeItem.entity';
import { PaginateResult } from './paginateResult.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoreItemPage extends PaginateResult(StoreItem) {}
