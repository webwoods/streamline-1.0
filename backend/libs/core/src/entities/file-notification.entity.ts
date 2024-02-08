import { ObjectType, Field } from '@nestjs/graphql';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Notification } from './notification.entity';
import { File } from './file.entity';

@Entity()
@ObjectType()
export class FileNotification extends Notification {
    @Column({ name: 'file_id', nullable: true })
    @Field({ nullable: true })
    fieldId?: string;


    @ManyToOne(() => File, (entity: File) => entity.notifications, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'file_id', referencedColumnName: 'id' })
    request: File;
}
