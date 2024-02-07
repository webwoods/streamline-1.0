import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { NotificationReciever } from './notification-reciever.entity';

@Entity()
@ObjectType()
export class Notification extends StreamLineEntity {
    @Column()
    @Field()
    message!: string;

    @Column()
    @Field()
    senderId!: string;

    @OneToMany(() => NotificationReciever, (entity: NotificationReciever) => entity.notification)
    @Field(() => [Notification], { nullable: true })
    recievers?: NotificationReciever[];
}
