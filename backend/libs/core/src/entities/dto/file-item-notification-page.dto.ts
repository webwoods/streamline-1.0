import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { RequestNotification } from '../request-notification.entity';
import { FileNotification } from '../file-notification.entity';

@ObjectType()
export class FileNotificationPage extends PaginateResult(FileNotification) {}