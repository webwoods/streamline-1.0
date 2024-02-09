import { ObjectType, Field } from '@nestjs/graphql';
import { Column, ManyToOne, JoinColumn, ChildEntity } from 'typeorm';
import { Notification } from './notification.entity';
import { StoreItem } from './store-item.entity';

@ChildEntity()
@ObjectType()
export class StoreItemNotification extends Notification {

    @Column({ name: 'store_item_id', nullable: true })
    @Field({ nullable: true })
    storeItemId?: string;

    @ManyToOne(() => StoreItem, (entity: StoreItem) => entity.notifications, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'store_item_id', referencedColumnName: 'id' })
    storeItem: StoreItem;

}
