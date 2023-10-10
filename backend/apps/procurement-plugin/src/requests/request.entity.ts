import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from '@libs/core/entities/streamline.entity';
import { File } from '../files/file.entity';
import { User } from '@libs/core/users/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Request extends StreamLineEntity {
  @Column()
  @Field()
  requestType: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @ManyToOne(() => File, (entity: File) => entity.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'file_id', referencedColumnName: 'id' })
  @Field(() => File, { nullable: true })
  file?: File;

  @Column({ name: 'file_id', nullable: true })
  fileId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'requested_by', referencedColumnName: 'id' })
  @Field(() => User, { nullable: true })
  requestedUser: User;

  @Column({ name: 'requested_by', nullable: true })
  requestedUserId: string;
}
