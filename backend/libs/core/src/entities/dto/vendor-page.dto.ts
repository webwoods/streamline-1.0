import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from './paginate-result.dto';
import { Vendor } from '../vendor.entity';

@ObjectType()
export class VendorPage extends PaginateResult(Vendor) {}