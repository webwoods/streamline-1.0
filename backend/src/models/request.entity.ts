import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from './file.entity';

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
}
