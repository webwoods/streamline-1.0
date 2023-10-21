import { PaginateResult } from './paginateResult.dto';
import { ObjectType } from '@nestjs/graphql';
import { Property } from '../property.entity';

@ObjectType()
export class PropertyPage extends PaginateResult(Property) {}
