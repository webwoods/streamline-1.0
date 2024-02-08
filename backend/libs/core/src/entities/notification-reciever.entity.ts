import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { Notification } from './notification.entity';

@Entity()
@ObjectType()
export class NotificationReciever extends StreamLineEntity {
    @Column()
    @Field()
    recieverId: string;

    @Column()
    @Field({ defaultValue: false })
    isRead: boolean

    @ManyToOne(() => Notification, (entity: Notification) => entity.recievers, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'notification_id', referencedColumnName: 'id' })
    @Field(() => Notification, { nullable: true })
    notification?: Notification;

    @Column({ name: 'notification_id', nullable: true })
    @Field({ nullable: true })
    notificationId?: string;
}
