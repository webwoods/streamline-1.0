import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { RequestNotification } from '../request-notification.entity';
import { RoleNotification } from '../role-notification.entity';

@ObjectType()
export class RoleNotificationPage extends PaginateResult(RoleNotification) {}