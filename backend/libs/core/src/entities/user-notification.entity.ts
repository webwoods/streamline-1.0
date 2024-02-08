import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Notification } from './notification.entity';
import { Request } from './request.entity';

@Entity()
@ObjectType()
export class UserNotification extends Notification {
    @Column({  name: 'user_id',nullable: true })
    @Field({ nullable: true })
    userId?: string;

    @ManyToOne(() => Request, (entity: Request) => entity.notifications, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    request: Request;

}
