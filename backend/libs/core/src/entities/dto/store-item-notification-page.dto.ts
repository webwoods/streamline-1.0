import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { StoreItemNotification } from '../store-item-notification.entity';

@ObjectType()
export class StoreItemNotificationPage extends PaginateResult(StoreItemNotification) {}
