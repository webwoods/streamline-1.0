import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from './streamline.entity';
import { File } from './file.entity';
import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, AfterInsert, AfterUpdate, EntityManager, DataSource, getRepository } from 'typeorm';
import { RequestItem } from './request-items.entity';
import { RequestStatus } from './enum/requestStatus';
import { User } from './user.entity';
import { RequestType } from './enum/requestType';
import { RequestNotification } from './request-notification.entity';
import { StringArrayTransformer } from '../transformers/string-array.transformer';

@Entity()
@ObjectType()
export class Request extends StreamLineEntity {
  @Column({ name: 'request_type', type: 'text', nullable: true })
  @Field(() => RequestType)
  requestType: RequestType;

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
  @JoinTable({
    name: 'request_request_items',
    joinColumn: { name: 'request_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'request_item_id', referencedColumnName: 'id' },
  })
  @Field(() => [RequestItem], { nullable: true })
  requestItems?: RequestItem[];

  @Column({ name: 'status', type: 'text', nullable: true })
  @Field(() => RequestStatus)
  status: RequestStatus;

  @Column({ name: 'subject', nullable: true })
  @Field({ nullable: true })
  subject: string;

  @Column({ name: 'subtotal', type: 'float', nullable: true })
  @Field({ nullable: true })
  subtotal: number;

  @Column({ name: 'tax', type: 'float', nullable: true })
  @Field({ nullable: true })
  tax: number;

  @Column({ name: 'total', type: 'float', nullable: true })
  @Field({ nullable: true })
  total: number;

  @Column({ name: 'expected_at', type: 'date', nullable: true })
  @Field({ nullable: true })
  expectedAt!: Date;

  @Column({
    name: 'forward_to',
    nullable: true,
    type: 'text',
    transformer: new StringArrayTransformer()
  })
  @Field(() => [String], { nullable: true })
  forwardTo?: string[];

  @OneToMany(() => RequestNotification, (entity: RequestNotification) => entity.request)
  @Field(() => [RequestNotification], { nullable: true })
  notifications: RequestNotification[];
}
