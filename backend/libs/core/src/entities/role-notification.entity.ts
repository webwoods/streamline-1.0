import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Notification } from './notification.entity';
import { Request } from './request.entity';
import { Role } from './role.entity';

@Entity()
@ObjectType()
export class RoleNotification extends Notification {
    @Column({  name: 'role_id',  nullable: true })
    @Field({ nullable: true })
    roleId?: string;


    @ManyToOne(() => Role, (entity: Role) => entity.notifications, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
    request: Role;
}
