import { ObjectType, Field } from '@nestjs/graphql';
import {
    Entity,
    Column,
} from 'typeorm';
import { Notification } from './notification.entity';

@Entity()
@ObjectType()
export class RequestItemNotification extends Notification {
    @Column({ nullable: true })
    @Field({ nullable: true })
    requestItemId?: string;

}
