import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, OneToMany, TableInheritance } from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { NotificationReciever } from './notification-reciever.entity';

@Entity()
@ObjectType()
@TableInheritance({ column: { type: "varchar", name: "type" } })
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

    @Field(type => String, { nullable: true })
    type?:string;
}
