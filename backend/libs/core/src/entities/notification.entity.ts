import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, OneToMany, TableInheritance, ManyToOne, JoinColumn } from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { NotificationReciever } from './notification-reciever.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Notification extends StreamLineEntity {
    @Column()
    @Field()
    message!: string;

    @Column({ name: 'sender_id', nullable: true })
    @Field()
    senderId!: string;

    // @ManyToOne(() => User, (user) => user.notifications, { nullable: true })
    // @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
    @Field(() => User, { nullable: true })
    sender: User;

    @OneToMany(() => NotificationReciever, (entity: NotificationReciever) => entity.notification)
    @Field(() => [NotificationReciever], { nullable: true })
    recievers?: NotificationReciever[];

    @Column({ name: 'type' })
    @Field(() => String, { nullable: true })
    type?: string;
}
