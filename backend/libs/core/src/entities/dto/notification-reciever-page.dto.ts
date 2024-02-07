import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { NotificationReciever } from '../notification-reciever.entity';

@ObjectType()
export class NotificationRecieverPage extends PaginateResult(NotificationReciever) {}
