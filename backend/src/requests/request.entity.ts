import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from 'src/files/file.entity';
import { User } from 'src/users/user.entity';

@Entity()
@ObjectType()
export class Request {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  // a file is like a collection of requests
  @Column({ name: 'file_id', nullable: true })
  fileId: string;

  @ManyToOne(() => File, (entity: File) => entity.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'file_id', referencedColumnName: 'id' })
  @Field(() => File, { nullable: true })
  file?: File;

  @Column()
  @Field()
  requestType: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'requested_by', referencedColumnName: 'id' })
  @Field(() => File, { nullable: true })
  requestedUser: User;

  @Column({ name: 'requested_by', nullable: true })
  requestedUserId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedAt: Date;
}
