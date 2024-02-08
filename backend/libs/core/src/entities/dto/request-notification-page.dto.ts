import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { RequestNotification } from '../request-notification.entity';

@ObjectType()
export class RequestNotificationPage extends PaginateResult(RequestNotification) {}
