import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from './streamline.entity';
import { File } from './file.entity';
import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { RequestItem } from './request-items.entity';
import { RequestStatus } from './enum/requestStatus';
import { User } from './user.entity';

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

  @Field({ nullable: true })
  requestedUser: User;

  @Column({ name: 'requested_by', nullable: true })
  @Field({ nullable: true })
  requestedUserId: string;

  @ManyToMany(() => RequestItem, (requestItem) => requestItem.requests, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @Field(() => [RequestItem], { nullable: true })
  requestItems?: RequestItem[];

  @Column({ name: 'status', type: 'text', nullable: true })
  @Field(() => RequestStatus)
  status: RequestStatus;

  @Column({ name: 'subject', nullable: true })
  @Field({ nullable: true })
  subject: string;
}
