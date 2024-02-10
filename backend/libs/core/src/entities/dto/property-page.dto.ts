import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { Property } from '../property.entity';

@ObjectType()
export class PropertyPage extends PaginateResult(Property) {}
