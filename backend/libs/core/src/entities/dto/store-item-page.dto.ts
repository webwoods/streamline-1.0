import { StoreItem } from '../store-item.entity';
import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoreItemPage extends PaginateResult(StoreItem) {}
