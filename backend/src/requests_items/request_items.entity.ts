import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from 'src/files/file.entity';
import { User } from 'src/users/user.entity';
import { Properties } from './propertie';

@Entity()
@ObjectType()
export class RequestItems {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  // a file is like a collection of requests
  @Column({ name: 'file_id', nullable: true })
  type?: string;

  @Column({ name: 'file_id', nullable: true })
  skn: string;

  @OneToMany(() => Request, (entity: Request) => entity.mode, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'file_id', referencedColumnName: 'id' })
  @Field(() => Request, { nullable: true })
  request: Request;

  @Column({ name: 'file_id', nullable: true })
  name?: string;

  @ManyToOne(() => Properties, (entity: Properties) => entity.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })

  @JoinColumn({ name: 'file_id', referencedColumnName: 'id' })
  @Field(() => File, { nullable: true })
  properties?: Properties;

  @Column()
  @Field({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedAt: Date;
}
