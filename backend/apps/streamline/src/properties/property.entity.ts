import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from '@libs/core/entities/streamline.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { RequestItem } from '../request-items/request-items.entity';

@Entity()
@ObjectType()
export class Property extends StreamLineEntity {
  @Column()
  @Field()
  key: string;

  @Column()
  @Field()
  value: string;

  @Column()
  @Field()
  type: string;

  @ManyToMany(() => RequestItem, (requestItem) => requestItem.properties)
  requestItems?: RequestItem[];
}
