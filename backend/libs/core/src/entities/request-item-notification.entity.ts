import { ObjectType, Field } from '@nestjs/graphql';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Notification } from './notification.entity';
import { Request } from './request.entity';
import { RequestItem } from './request-items.entity';

@Entity()
@ObjectType()
export class RequestItemNotification extends Notification {
    @Column({ name:"request_item_id", nullable: true })
    @Field({ nullable: true })
    requestItemId?: string;

    @ManyToOne(() => RequestItem, (entity: RequestItem) => entity.notifications, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'request_item_id', referencedColumnName: 'id' })
    requestItem: RequestItem;

}
