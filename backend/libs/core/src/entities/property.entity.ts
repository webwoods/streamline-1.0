import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from './streamline.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { RequestItem } from './request-items.entity';

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

  @ManyToMany(() => RequestItem, (requestItem) => requestItem.properties, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @Field(() => [RequestItem], { nullable: true })
  requestItems?: RequestItem[];
}
