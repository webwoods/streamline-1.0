import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from 'src/core/streamline.entity';
import { File } from 'src/files/file.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Request extends StreamLineEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

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
