import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn, ChildEntity } from 'typeorm';
import { Request } from './request.entity';
import { Notification } from './notification.entity';

@ChildEntity()
@ObjectType()
export class RequestNotification extends Notification {

    @Column({ name: 'request_id', nullable: true })
    @Field({ nullable: true })
    requestItemId?: string;

    @ManyToOne(() => Request, (entity: Request) => entity.notifications, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'request_id', referencedColumnName: 'id' })
    request: Request;

}
