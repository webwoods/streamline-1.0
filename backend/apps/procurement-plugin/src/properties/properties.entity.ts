import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from '@libs/core/entities/streamline.entity';
import {
  Entity,
  Column,
  ManyToMany
} from 'typeorm';

@Entity()
@ObjectType()
export class Properties extends StreamLineEntity {
  @Column()
  @Field()
  key: string;

  @Column()
  @Field()
  value: string;

  @Column()
  @Field()
  type: string;
}