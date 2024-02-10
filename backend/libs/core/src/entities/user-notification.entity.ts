import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Notification } from './notification.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class UserNotification extends Notification {
    @Column({  name: 'user_id',nullable: true })
    @Field({ nullable: true })
    userId?: string;

    // @ManyToOne(() => User, (entity: User) => entity.notifications, {
    //     onDelete: 'SET NULL',
    //     onUpdate: 'CASCADE',
    // })
    // @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    // user: User;

}
