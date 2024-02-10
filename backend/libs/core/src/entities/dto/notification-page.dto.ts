import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { Notification } from '../notification.entity';

@ObjectType()
export class NotificationPage extends PaginateResult(Notification) {}
