import { ObjectType, Field } from '@nestjs/graphql';
import {
    Entity,
    Column,
} from 'typeorm';
import { Notification } from './notification.entity';

@Entity()
@ObjectType()
export class PropertyNotification extends Notification {
    @Column({ nullable: true })
    @Field({ nullable: true })
    propertyId?: string;

}
