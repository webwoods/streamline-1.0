import { ObjectType, Field } from '@nestjs/graphql';
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
export class RequestItemNotification extends Notification {
    @Column({ name:"request_item_id", nullable: true })
    @Field({ nullable: true })
    requestItemId?: string;


    @ManyToOne(() => Request, (entity: Request) => entity.notifications, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'request_item_id', referencedColumnName: 'id' })
    request: Request;


}
