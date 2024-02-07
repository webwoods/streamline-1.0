import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
    Entity,
    Column,
} from 'typeorm';
import { Notification } from './notification.entity';

@Entity()
@ObjectType()
export class RoleNotification extends Notification {
    @Column({ nullable: true })
    @Field({ nullable: true })
    roleId?: string;



}
