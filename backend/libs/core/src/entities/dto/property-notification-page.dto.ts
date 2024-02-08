import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { PropertyNotification } from '../property-notification.entity';

@ObjectType()
export class PropertyNotificationPage extends PaginateResult(PropertyNotification) {}
