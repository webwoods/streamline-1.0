import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { RequestNotification } from '../request-notification.entity';
import { RequestItemNotification } from '../request-item-notification.entity';

@ObjectType()
export class RequestItemNotificationPage extends PaginateResult(RequestItemNotification) {}